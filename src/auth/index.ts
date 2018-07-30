import passport from 'passport'
import passportLocal from 'passport-local'
import passportHttpBearer from 'passport-http-bearer'

import User from '../models/user'
import { Client } from '../models/client'
import AccessToken from '../models/access_token'

const LocalStrategy = passportLocal.Strategy
const BearerStrategy = passportHttpBearer.Strategy

passport.serializeUser<any, any>((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  User.findOne({ where: {id} })
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
    User.findOne({ where: {username} })
        .then(user => {
            if (!user) return done(null, false)
            if (user.password !== password) return done(null, false)
            return done(null, user)
        })
        .catch(err => done(err, null))
  }
))


/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token). If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy((token: string, done: any) => {
    AccessToken.findOne({ where: {token} })
        .then(token => {
            if (!token) return done(null, false)
            if (token.userId) {
                User.findOne({ where: {id: token.userId } })
                    .then(user => {
                        if (!user) return done(null, false)
                        // TODO resricted scopes
                        done(null, user, { scope: '*' })
                    })
                    .catch(err => done(err, null))
            } else {
                Client.findOne({ where: {clientId: token.clientId} })
                    .then(client => {
                        if (!client) return done(null, false)
                        // TODO resricted scopes
                        done(null, client, { scope: '*' })
                    })
            }
        })
  }
))
