const express = require('express')
const app = express()
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

//define endpoints
//to get root route
app.get('/', (request, response) => {
    response.send('<h1>Hello World!  I Love India!<h1>');
})

//to get all the data
app.get('/api/data', (request, response) => {
    response.json(data)
})

//make server listen to the HTTP req
const HOSTNAME = '127.0.0.1'
const PORT = '3000'
app.listen(PORT, () => { console.log(`Server started running! http://${HOSTNAME}:${PORT}/`) })
