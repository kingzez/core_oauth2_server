import oauth2orize from 'oauth2orize'
import passport from 'passport'
import login from 'connect-ensure-login'
import { Request, Response, RequestHandler } from "express"
import {
    OAuth2Server,
    OAuth2,
    MiddlewareFunction,
    SerializeClientDoneFunction,
    DeserializeClientDoneFunction
} from 'oauth2orize'
import Axios, { AxiosResponse, AxiosError } from 'axios'

import { default as Client, ClientAttributes } from '../models/client'
import { PassportAttributes } from '../models/passport'
import { getUid } from '../util/util'
import logger from '../util/logger'
import { SESSION_HOST } from '../config'

// Create OAuth 2.0 Server
const server: OAuth2Server = oauth2orize.createServer()

// Register serialialization and deserialization functions.
//
// When a client redirects a user to user authorization endpoint, an
// authorization transaction is initiated. To complete the transaction, the
// user must authenticate and approve the authorization request. Because this
// may involve multiple HTTP request/response exchanges, the transaction is
// stored in the session.
//
// An application must supply serialization functions, which determine how the
// client object is serialized into the session. Typically this will be a
// simple matter of serializing the client's ID, and deserializing by finding
// the client by ID from the database.

server.serializeClient((client: any, done: SerializeClientDoneFunction) => done(null, client.id))

server.deserializeClient((id: string, done: DeserializeClientDoneFunction) => {
    Client.findOne({ where: {id} })
        .then(client => done(null, client))
        .catch(err => done(err,null))
})

// Register supported grant types.
//
// OAuth 2.0 specifies a framework that allows users to grant client
// applications limited access to their protected resources. It does this
// through a process of the user granting access, and the client exchanging
// the grant for an access token.

// Grant authorization codes. The callback takes the `client` requesting
// authorization, the `redirectUri` (which is used as a verifier in the
// subsequent exchange), the authenticated `user` granting access, and
// their response, which contains approved scope, duration, etc. as parsed by
// the application. The application issues a code, which is bound to these
// values, and will be exchanged for an access token.

server.grant(oauth2orize.grant.code((client: ClientAttributes, redirectUri: string, passport: PassportAttributes, done: any) => {
    const code = getUid(16)
    Axios.post(SESSION_HOST+'/authcode', {
        code,
        clientId: client.id,
        redirectUri,
        passportId: passport.id
    }).then((res: AxiosResponse) => {
        logger.debug('create authCode result: \n', res.data)
        return done(null, code)
    }).catch((err: any) => {
        logger.debug(err)
        done(err, null)
    })
}))

// Grant implicit authorization. The callback takes the `client` requesting
// authorization, the authenticated `user` granting access, and
// their response, which contains approved scope, duration, etc. as parsed by
// the application. The application issues a token, which is bound to these
// values.

server.grant(oauth2orize.grant.token((client: ClientAttributes, passport: PassportAttributes, done: any) => {
    const token = getUid(256)
    Axios.post(SESSION_HOST + '/accesstoken', {
        token,
        passportId: passport.id,
        clientId: client.clientId
    }).then((res: AxiosResponse) => {
        logger.debug('create accessToken result: \n', res.data)
        return done(null, token)
    }).catch((err: AxiosError) => done(err, null))
}))

// Exchange authorization codes for access tokens. The callback accepts the
// `client`, which is exchanging `code` and any `redirectUri` from the
// authorization request for verification. If these values are validated, the
// application issues an access token on behalf of the user who authorized the
// code.

server.exchange(oauth2orize.exchange.code((client: ClientAttributes, code: string, redirectUri: string, done: any) => {
    Axios.get(`${SESSION_HOST}/authcode?code=${code}`)
        .then((res: AxiosResponse) => {
            logger.debug('find authCode result: \n', res.data)
            if (!res.data.authCode) return done(null, false)
            const authCode = res.data.authCode
            logger.debug(client.id, authCode.clientId)
            if (client.id !== authCode.clientId) return done(null, false)
            if (redirectUri !== authCode.redirectUri) return done(null, false)
            const token = getUid(256)
            Axios.post(SESSION_HOST + '/accesstoken', {
                token,
                passportId: authCode.passportId,
                clientId: authCode.clientId
            }).then((res: AxiosResponse) => {
                logger.debug('create accessToken: \n', res.data)
                return done(null, token)
            }).catch((err: AxiosError) => done(err, null))
        })
}))


// User authorization endpoint.
//
// `authorization` middleware accepts a `validate` callback which is
// responsible for validating the client making the authorization request. In
// doing so, is recommended that the `redirectUri` be checked against a
// registered value, although security requirements may vary accross
// implementations. Once validated, the `done` callback must be invoked with
// a `client` instance, as well as the `redirectUri` to which the user will be
// redirected after an authorization decision is obtained.
//
// This middleware simply initializes a new authorization transaction. It is
// the application's responsibility to authenticate the user and render a dialog
// to obtain their approval (displaying details about the client requesting
// authorization). We accomplish that here by routing through `ensureLoggedIn()`
// first, and rendering the `dialog` view.

export const authorization:(MiddlewareFunction | RequestHandler)[] = [
    login.ensureLoggedIn(),
    server.authorization((clientId: string, redirectUri: string, done: any) => {
        Client.findOne({ where: {clientId} })
            .then((client: ClientAttributes) => {
                if (!client) return done(client, null)
                // TODO registered scope
                return done(null, client, redirectUri)
            })
    }, (client: ClientAttributes, passport: PassportAttributes, done:any) => {
        // Check if grant request qualifies for immediate approval

        // Auto-approve
        if (client.isTrusted) return done(null, true)

        Axios.get(`${SESSION_HOST}/accesstoken?passportId=${passport.id}&clientId=${client.clientId}`)
            .then((res: AxiosResponse) => {
                // Auto-approve
                logger.debug('find accessToken result: \n', res.data)
                if (!res.data.accessToken) return done(null, true)

                // Otherwise ask user
                return done(null, false)
            }).catch((err: AxiosError) => {
                logger.debug('error', err)
                return done(err, null)
            })
    }),
    (req: Request & { oauth2: OAuth2 }, res: Response) => {
        res.render('dialog', {
            transactionId: req.oauth2.transactionID,
            user: req.user,
            client: req.oauth2.client,
        })
    }
]



// User decision endpoint.
//
// `decision` middleware processes a user's decision to allow or deny access
// requested by a client application. Based on the grant type requested by the
// client, the above grant middleware configured above will be invoked to send
// a response.

export const decision: (MiddlewareFunction | RequestHandler)[] = [
    login.ensureLoggedIn(),
    // @ts-ignore
    server.decision(),
]


// Token endpoint.
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens. Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request. Clients must
// authenticate when making requests to this endpoint.

export const token: (MiddlewareFunction | RequestHandler)[] = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler(),
]