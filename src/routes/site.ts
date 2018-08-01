import passport from "passport"
// import Login from "connect-ensure-login"
import { Request, Response } from "express"


export const login = passport.authenticate('local', { 
    successReturnToOrRedirect: '/', 
    failureRedirect: '/login' 
})

export const logout =  function( request:Request , response:Response ){
    request.logout();
    response.redirect('/');
  }

  