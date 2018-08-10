import passport from 'passport'
import passportLocal from 'passport-local'
import passportHttp from 'passport-http'
import passportHttpBearer from 'passport-http-bearer'
import passportOauth2ClientPassword from 'passport-oauth2-client-password'
import Axios, { AxiosResponse, AxiosError } from 'axios'

import { default as Passport, PassportAttributes } from '../models/passport'
import { default as Client } from '../models/client'
import logger from '../util/logger'
import { SESSION_HOST } from '../config'


const LocalStrategy = passportLocal.Strategy
const BasicStrategy = passportHttp.BasicStrategy
const BearerStrategy = passportHttpBearer.Strategy
const ClientPasswordStrategy = passportOauth2ClientPassword.Strategy

passport.serializeUser<any, any>((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
    Passport.findOne({ where: {id} })
    .then(user => done(null, user))
    .catch(err => done(err, null))
})

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(new LocalStrategy((username: string, password: string, done: any) => {
    Passport.findOne({ where: { username, isDelete: false } })
        .then(user => {
            if (!user) return done(null, false)
            if (user.password !== password) return done(null, false)
            return done(null, user)
        })
        .catch(err => done(err, null))
  }
))

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients. They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens. The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate. Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header). While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
function verifyClient(clientId: string, clientSecret: string, done: any) {
    Client.findOne({ where: { clientId } })
        .then(client => {
            if (!client) return done(null, false)
            if (client.clientSecret !== clientSecret) return done(null, false)
            return done(null, client)
        })
        .catch(err => done(err, null))
  }

  passport.use(new BasicStrategy(verifyClient))

  passport.use(new ClientPasswordStrategy(verifyClient))


/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token). If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy((token: string, done: any) => {
    Axios.get(`${SESSION_HOST}/accesstoken?token=${token}`)
        .then(async (res: AxiosResponse) => {
            logger.debug('find accesstoken result: \n', res.data)
            if (!res.data.accessToken) return done(null, false)
            const token = res.data.accessToken

            let passport = await Passport.findOne({ where: {id: token.passportId} }).catch((err: any) => done(err, null))

            if (!passport) return done(null, false)

            passport = passport.toJSON()
            delete passport.password

            return done(null, passport, { scope: '*' })

        }).catch((err: AxiosError) => done(err, null))
  }
))
