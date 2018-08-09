import passport from 'passport'
import { Request, Response, RequestHandler } from "express"
import { MiddlewareFunction } from 'oauth2orize'
import { default as Passport } from '../models/passport'


export const userRegist: RequestHandler = (req: Request, res: Response, done: any) => {
    let { username, password, email } = req.body
    if(!username || !password || !email){
        return res.json({ message: "用户信息填写不完整"})
    }
    Passport.create({
        username,
        password,
        email
    }).then(user => {
        res.json({ user: user })
    }).catch(err => {
        done(err, null)
    })
  }

export const info: (MiddlewareFunction | RequestHandler)[] = [
    passport.authenticate('bearer', { session: false }),
    (req: Request, res: Response) => {
        res.json({ user: req.user, scope: req.authInfo.scope })
    }
  ]

