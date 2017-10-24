# Spectero Dummy API

Dummy API running on a Node HTTP server for testing Spectero Vue frontend. Returns fake hard-coded data in all requests. Has basic HTTP error handling, default port is 3000.

### Installation

``` bash
npm install
npm start
```

You can now access the API via http://localhost:3000

### Methods

``` bash
# Retrieve list of all nodes (eventually will add auth to the API so you can only fetch nodes that belong to you)
GET /nodes
```