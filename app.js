/**
 * Simple ExpressJS app to simulate API used for Spectero frontend.
 */

const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')

const data = require('./data.js')

const port = 3000 // Port for server (default: 3000)
const secret = 'a$+,@:}-QNaCJK/gPy65%zj>tKZ>)w4/' // Secret hash for JSON web token (plaintext is obviously most secure way to handle this ^_^)

let formatResponse = function (code, errors, message, data, endpoint) {
  return {
    code: code,
    errors: errors,
    message: message,
    data: data,
    endpoint: endpoint
  }
}

let sendResult = function (req, res, next) {

  let status = res.locals.code || 200

  res.status(status).json({
    code:      status,
    errors:    res.locals.errors    || [],
    message:   res.locals.message   || null,
    data:      res.locals.data      || null,
    endpoint:  res.locals.endpoint  || req.url
  })

}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(expressJWT({ secret: secret }).unless({ path: ['/login', '/nodes'] }))

app.route('/nodes')
.get(function (req, res, next) {
  res.locals.data = { nodes: data.nodes }
  next()
}, sendResult)

// Basic login handler
app.route('/login')
.post(function (req, res, next) {

  let username = req.body.username
  let password = req.body.password
  let user = data.users[username]

  // Username/password missing
  if ( !username || !password ) {
    res.locals.code = 400
    res.locals.errors = ['Missing username or password.']
    return next()
  }

  // User not found
  if ( user === undefined || user.password !== password ) {
    res.locals.code = 401
    res.locals.errors = ['Invalid username or password.']
    return next()
  }

  // Logged in!
  let myToken = jwt.sign({ username: username }, secret)
  res.locals.data = {authToken: myToken}

  next()

}, sendResult)

app.use('/', router)

// Handle 404 not found result
app.all('*', function (req, res, next) {
  res.locals.code = 404
  res.locals.errors = ['404 Not Found']
  next()
}, sendResult)

app.listen(port, function () {
  console.log(`Server started on port ${port}`)
})
