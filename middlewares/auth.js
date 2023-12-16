//write function to verify token to avoid doing multiple

const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getTokenFrom = request => {
    const auth = request.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
}

const verifyToken = (request, response, next) => {

    //get the token from the authorization header
    const token = getTokenFrom(request)

    //if token missing return error message
    if (!token) {
        return response.status(401).json({ message: 'Token missing' })
    }

    let decodedToken
    try {
        //verify the token and decode user who crreated th note
        decodedToken = jwt.verify(token, config.JWT_SECRET)
    } catch (error) {
        //if token Expires or invalid or return an error
        if (error.name == 'TokenExpiredError')
            return response.status(401).json({ message: 'Token Expired' })
        else
            return response.status(401).json({ message: 'Token Invalid' })
    }

    //if token is valid, update request object with user id
    request.userId = decodedToken.id
    next()
}

module.exports = {
    verifyToken
};