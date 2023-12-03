const express = require('express')
const app = express()

//middleware

app.use(express.json())

//make server listen to the HTTP req
const HOSTNAME = '127.0.0.1'
const PORT = '3000'
app.listen(PORT, () => { console.log(`Server started running! http://${HOSTNAME}:${PORT}/`) })
