//import the library http

const http = require('http')

//data

let data = [
    {
        id: 1,
        Name: "Priyanka",
        age: 25
    },
    {
        id: 1,
        Name: "Ridhin",
        age: 2
    },
    {
        id: 1,
        Name: "Dhnesh",
        age: 26
    }
]

//create http web server

const app = http.createServer((request, response) => {
    /*   response.writeHead(200, { 'Content-Type': 'text/plain' })
     response.end('HelloWORLD!')  */
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify(data))
})

//make server listen to the HTTP req
const PORT = '3001'
app.listen(PORT, () => { console.log("Server started running!") })
