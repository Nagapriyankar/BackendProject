const { info, error } = require('./logger');


// create a request logger middleware
const requestLogger = (request, response, next) => { 
    info('Method:', request.method)
    info('Path:', request.path)
    info('Body:', request.body)
    info('----------------------')
    next()
}

//middlware to handle unknown endpoint
const unknownEndpoint = (request, response) => { 
    response.status(404).send({error: 'Unknown Endpoint'})
}

module.exports = {
    requestLogger, unknownEndpoint
}