import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'

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
app.get('/', (req, res) => {
    res.render('index', {
        title: '小云营销 登录'
    })
})

export default app
