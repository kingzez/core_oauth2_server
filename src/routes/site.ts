import passport from "passport"
// import Login from "connect-ensure-login"
import { Request, Response, RequestHandler } from "express"


export const login: RequestHandler = passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
})

export const logout: RequestHandler =  function( request: Request , response: Response ){
    request.logout();
    response.redirect('/');
  }

