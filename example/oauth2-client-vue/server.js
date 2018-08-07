const express = require('express')
const bodyParser = require('body-parser')
const Request = require('request')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const log4js = require('log4js')

const logger = log4js.getLogger('app')
logger.level = 'debug';

const { access_token_uri, auth } = require('./oauth2config.json')
console.log( access_token_uri, auth )

const app = express()
app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url :status' }))
app.use(cors())
app.use(bodyParser.json())
// app.use(allowCrossDomain)
app.use(history())
app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
  res.send('vue-authenticate')
})

app.get('/ping', function (req, res) {
  res.send('pong')
})

app.post('/api/auth/wesso', function(req, res){
  console.log(req.body)
  wessoAuth(req, res)
})

app.listen(5000, () => console.log('server running at http://localhost:5000'))

function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}


function wessoAuth(req, res) {
  console.log(auth.wesso.clientId)
  Request({
    method: 'post',
    url: access_token_uri,
    form: {
      code: req.body.code,
      client_id: auth.wesso.clientId,
      client_secret: auth.wesso.clientSecret,
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }, function (err, response, body) {
    console.log(response.body)
    try {
      if (!err && response.statusCode === 200) {
        const responseJson = JSON.parse(body)
        res.json(responseJson)
      } else {
        res.status(response.statusCode).json(err)
      }
    } catch (e) {
      res.status(500).json(err || e)
    }
  })
}
