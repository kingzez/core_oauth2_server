import path from 'path'
import { default as express, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'
import { login, logout } from './routes/site'
import { authorization, decision, token } from './routes/oauth2'
import { info } from './routes/user'

import './auth'

const app = express()

// Express configuration
app.set("port", process.env.PORT || 8998)
app.set("views", path.join(__dirname, "../views"))
app.set("view engine", "ejs")

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'wesso-secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

// temp router
app.get('/', (req: Request, res: Response) => {
    res.send('Core_oauth2_server')
})

app.get('/login', (req: Request, res: Response) => {
    res.render('index', {
        title: '小云营销 登录'
    })
})

app.post('/login', login)
app.get('/logout', logout)
app.get('/dialog/authorize', authorization)
app.post('/dialog/authorize/decision', decision)
app.post('/oauth/token', token)

app.get('/api/userinfo', info)

export default app
