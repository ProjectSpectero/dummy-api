/**
 * Simple ExpressJS app to simulate API used for Spectero frontend.
 */

const express = require('express')
const app = express()
const router = express.Router()

const data = require('./data.js')

const port = 3000 // Port for server (default: 3000)

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

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.route('/nodes')
.get(function (req, res, next) {
  res.locals.data = { nodes: data.nodes }
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
