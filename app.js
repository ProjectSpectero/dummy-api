/**
 * Dead simple HTTP server to simulate an API used for testing
 * frontend of Spectero VueJS application. Filled w/ fake data.
 * 
 * Made in 10 minutes so no judgment on the quality of the code ^_^
 */

const http = require('http')
const port = 3000

const data = require('./dummy-data.js')

const requestHandler = (request, response) => {
  
  let result = {
    code: 200,
    errors: [],
    message: null,
    data: null,
    endpoint: null
  }

  let routes = {
    '/nodes': {
      GET: function () {
        return {
          nodes: data.nodes()
        }
      }
    }
  }

  let errorNotFound = function (result) {
    result.code = 404
    result.errors.push(`404 Not Found`)
    response.statusCode = 404
    return response.end(JSON.stringify(result))
  }

  let errorMethodNotAllowed = function (result) {
    result.code = 405
    result.errors.push(`404 Method Not Allowed`)
    response.statusCode = 405
    return response.end(JSON.stringify(result))
  }

  console.log(`${request.method}  ${request.url}`)

  // Check if URL has route associated to it
  if ( routes[request.url] === undefined ) {
    return errorNotFound(result)
  }

  // Instead of having to declare GET method, can just directly feed
  // a function into the route if only GET method req'd.
  if ( typeof routes[request.url] === 'function' ) {
    result.data = routes[request.url]()
  }

  // Check if route method exists
  else if ( routes[request.url][request.method] === undefined ) {
    return errorMethodNotAllowed(result)
  }

  else {
    result.data = routes[request.url][request.method]()
  }

  response.setHeader(`Content-Type`, `application/json`)
  response.setHeader(`Access-Control-Allow-Origin`, `*`)
  response.end(JSON.stringify(result))
  
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log(`Server error`, err)
  }
  console.log(`Server listening on port ${port}\n`)
})