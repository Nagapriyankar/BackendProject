//as soon as the user login, JWT token is sent to front end
//this token is used in every api call

const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
    //get the credentials from user through request body
    const { userName, password } = request.body
    console.log(userName)
    //check if user exist in database
    const user = await User.findOne({ userName })
    console.log(user)
    //ifnot user exist  , send  error message
    if (!user)
        return response.status(401).json({ message: 'User does not exist' })

    //if user exist, ccompare pwd with pwdhash(db)
    const isAuthenticated = await bcrypt.compare(password, user.passwordHash)
    console.log(isAuthenticated)
    //if password doesnot match send error message
    if (!isAuthenticated)
        return response.status(401).json({ message: 'invalid password' })
    
    //if pwd matched ,generate a token
    const token = jwt.sign({
        userName: user.userName,
        id: user._id
    }, config.JWT_SECRET,  {expiresIn : '1h'}) 
    console.log(token)
    //SEND THE TOKEN BACK TO USER
    response.status(200).json({token, userName: user.userName, name: user.name})
})


module.exports = loginRouter