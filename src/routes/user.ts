import passport from 'passport'
import { Request, Response, RequestHandler } from "express"
import { MiddlewareFunction } from 'oauth2orize'

export const info: (MiddlewareFunction | RequestHandler)[] = [
    passport.authenticate('bearer', { session: false }),
    (req: Request, res: Response) => {
        res.json({ user: req.user, scope: req.authInfo.scope })

    }
  ]
