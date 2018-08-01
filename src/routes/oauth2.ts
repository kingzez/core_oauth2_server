import oauth2orize from 'oauth2orize'
import passport from 'passport'
import login from 'connect-ensure-login'
import { Request, Response } from "express";
import { OAuth2 } from 'oauth2orize' //interface

import { Client, ClientAttributes } from '../models/client'
import AuthorizationCode from '../models/authorization_code'
import AccessToken from '../models/access_token'
import { getUid } from '../util/util'
import logger from '../util/logger'


// Create OAuth 2.0 Server
const server = oauth2orize.createServer()

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

server.serializeClient((client, done) => done(null, client.id))

server.deserializeClient((id, done) => {
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

server.grant(oauth2orize.grant.code((client, redirectUri, passport, area, done) => {
    const code = getUid(16)
    AuthorizationCode.create({ code, clientId:client.id, redirectUri, passportId:passport.id })
        .then((result: any) => {
            logger.debug('result',result)
            if (!result) return done(result, null)
            return done(null, code)
        })
        .catch((err:any) => {
            done(err,null)
        })
}))

// Grant implicit authorization. The callback takes the `client` requesting
// authorization, the authenticated `user` granting access, and
// their response, which contains approved scope, duration, etc. as parsed by
// the application. The application issues a token, which is bound to these
// values.

server.grant(oauth2orize.grant.token((client, passport, ares, done) => {
    const token = getUid(256)
    AccessToken.create({ token, passportId: passport.id, clientId: client.clientId })
        .then((result: any) => {
            if (!result) return done(result, null)
            return done(null, token)
        })
        .catch((err: any) => done(err, null))
}))

// Exchange authorization codes for access tokens. The callback accepts the
// `client`, which is exchanging `code` and any `redirectUri` from the
// authorization request for verification. If these values are validated, the
// application issues an access token on behalf of the user who authorized the
// code.

server.exchange(oauth2orize.exchange.code((client, code, redirectUri, done) => {
    AuthorizationCode.findOne({ where: {code} })
        .then(authCode => {
            if (!authCode) return done(null, false)
            if (client.id !== authCode.clientId) return done(null, false)
            if (redirectUri !== authCode.redirectUri) return done(null, false)
            const token = getUid(256)
            AccessToken.create({ token, passportId: authCode.passportId, clientId: authCode.clientId })
                .then((result:any) => {
                    if (!result) return done(result, null)
                    return done(null, token)
                })
                .catch((err: any) => done(err, null))
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

export const authorization:any = [
    login.ensureLoggedIn(),
    server.authorization((clientId, redirectUri, done) => {
        Client.findOne({ where: {clientId} })
            .then((client:any) => {
                if (!client) return done(client, null)
                // TODO registered scope
                return done(null, client, redirectUri)
            })
    }, (client, passport, done:any) => {
        // Check if grant request qualifies for immediate approval

        // Auto-approve
        if (client.isTrusted) return done(null, true)

        AccessToken.findOne({ where: {passportId: passport.id, clientId: client.clientId } })
            .then(token => {
                // Auto-approve
                if (token) return done(null, true)

                // Otherwise ask user
                return done(null, false)
            })
    }),
    // TODO use Request, Response
    // need confirm correct
    (req:Request & { oauth2: OAuth2 }, res:Response) => {
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

export const decision = [
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

export const token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler(),
]
