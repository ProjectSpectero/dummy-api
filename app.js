/**
 * Dead simple HTTP server to simulate an API used for testing
 * frontend of Spectero VueJS application. Filled w/ fake data.
 * 
 * Made in 10 minutes so no judgment on the quality of the code ^_^
 */

const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  
  let result

  let notFound = function () {
    response.statusCode = 404
    response.end(`404 not found`)
  }
  
  let notAllowed = function () {
    response.statusCode = 405
    response.end(`405 not allowed`)
  }

  switch ( request.url ) {
    case '/nodes':
      switch ( request.method ) {
        case 'GET':
          result = JSON.stringify({
            result: {
              nodes: [
                {
                  id: 1,
                  title: 'dxbpi1',
                  ip: '94.202.105.172',
                  status: 'offline',
                  active: true
                },
                {
                  id: 2,
                  title: 'seapi1',
                  ip: '50.47.111.48',
                  status: 'online',
                  active: true
                },
                {
                  id: 3,
                  title: 'seapi2',
                  ip: '67.170.105.255',
                  status: 'online',
                  active: true
                },
                {
                  id: 4,
                  title: 'cadpi1',
                  ip: '74.334.224.48',
                  status: 'online',
                  active: true
                },
                {
                  id: 5,
                  title: 'dxbpi2',
                  ip: '94.202.105.173',
                  status: 'offline',
                  active: true
                },
              ]
            }
          })
        break
        default: notAllowed()
      }
    break
    default: notFound()
  }

  if ( result ) {
    // console.log(`Serving ${request.url}`)
    response.end(result)
  }
  else {
    notFound()
  }
  
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log(`Server error`, err)
  }
  console.log(`Server listening on port ${port}`)
})