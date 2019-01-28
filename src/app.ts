import path from 'path'
import { default as express, Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'
import morgan from 'morgan'

import { login, logout } from './routes/site'
import { authorization, decision, token } from './routes/oauth2'
import { info, userRegist } from './routes/user'
import { APP_NAME } from './config'

import './auth'

const app: Application = express()

// Express configuration
app.set("port", process.env.PORT || 8998)
app.set("views", path.join(__dirname, "../views"))
app.set("view engine", "ejs")

const corsOptions = {
    origin: ['http://localhost:8999', 'http://localhost:8080'],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'wesso-secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('tiny'))

// app.options('*', cors()) // enable pre-flight request

// temp router
app.get('/', (req: Request, res: Response) => {
    res.send('Core_oauth2_server')
})

app.get('/login', (req: Request, res: Response) => {
    res.render('index', {
        title: APP_NAME
    })
})

app.post('/login', login)
app.get('/logout', logout)
app.get('/dialog/authorize', authorization)
app.post('/dialog/authorize/decision', decision)
app.post('/oauth/token', token)

app.get('/api/userinfo', info)
app.post('/api/userRegist', userRegist)

// 路由先写页面（请修改）
app.get('/register', (req, res) => {
    res.render('register', {
        title: '注册'
    })
})

export default app
