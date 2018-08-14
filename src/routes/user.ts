import passport from 'passport'
import { Request, Response, RequestHandler } from "express"
import { MiddlewareFunction } from 'oauth2orize'
import { findPassportByUsername, findPassportByEmail, insertPassport } from '../models/passport'
import logger from '../util/logger'
import { go } from '../util/util'


export const userRegist: RequestHandler = async (req: Request, res: Response) => {
    let { username, password, email } = req.body
    let doc: any = {}
    for (let key in req.body) {
        if (req.body[key]) {
            doc[key] = req.body[key]
        }
    }

    if (!username || !password || !email) {
        return res.json({ status: 'not ok', message: "用户信息填写不完整" })
    }

    var [err, uname] = await go(findPassportByUsername(username))
    if (uname !== null) {
        return res.json({ status: 'ok', message: "用户名已被使用" })
    }

    var [err, uemail] = await go(findPassportByEmail(email))
    if (uemail !== null) {
        return res.json({ status: 'ok', message: "邮箱已被使用" })
    }

    var [err, result] = await go(insertPassport(doc))
    if (err) {
        logger.error('userRegist Error: ', err)
        res.json({ status: 'not ok', message: err })
    }

    return res.json({ status: 'ok', user: result })
  }

export const info: (MiddlewareFunction | RequestHandler)[] = [
    passport.authenticate('bearer', { session: false }),
    (req: Request, res: Response) => {
        res.json({ user: req.user, scope: req.authInfo.scope })
    }
  ]

