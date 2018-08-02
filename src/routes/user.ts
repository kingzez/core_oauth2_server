import passport from 'passport'
import { Request, Response } from "express"

export const info = [
    passport.authenticate('bearer', { session: false }),
    (req: Request, res: Response) => {
        res.json({ user: req.user, scope: req.authInfo.scope })
        
    }
  ]
