import passport from "passport"
// import login from "connect-ensure-login"


export const login = passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' });