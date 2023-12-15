const userRouter = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')

//endpoints to get all users
userRouter.get('/', (request, response) => {
    User.find({}, {})
        .then(users => {
            response.status(200).json(users)
        })
        .catch(err => {
            response.status(404).json({ message: 'List is Empty' })
        })
})

//endpoint - user reqistration with bcrypt
userRouter.post('/', async (request, response) => {
    //get the user details from the request body
    const { name, userName, password } = request.body

    //check if user already exists
    const userExists = await User.findOne({ userName })
    
    //if user exits, send an error message 
    if (userExists)
        return response.status(409).json({message: 'User Already exists'})

    //hash the pwd and store in the password hash field(install bcrypt)
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
        name,
        userName,
        passwordHash
    })

    //saveuser object
    const savedUser = await user.save()

    //send the response back
    response.json(savedUser)
})

//endpoint to getuser by id
userRouter.get('/:id', (request, response) => {
    const id = request.params.id

    User.findById(id)
        .then(user => {
            response.status(200).json(user)
        })
        .catch(err => {
            response.status(404).json({ message: 'User ID doesnot exist' })
        })
})

//endpoint to delete user by id
userRouter.delete('/:id', (request, response) => {
    const id = request.params.id

    User.findByIdAndDelete(id)
        .then((delUser) => {
            if (delUser)
                response.status(200).json({ message: 'User deleted succcessfully' })
            else
                response.status(404).json({ message: 'User ID doesnot exist' })
        })
        .catch(err => {
            response.status(404).json({ message: 'User ID doesnot exist' })
        })
})


// endpoint to replace the entire user object identified by an id
userRouter.put('/:id', (request, response) => {
    const id = request.params.id;
    const userToUpdate = request.body;

    User.findByIdAndUpdate(id, userToUpdate)
        .then(updatedUser => {
            if (updatedUser) {
                response.status(200).json({ message: 'note replaced successfully' });
            } else {
                response.status(404).json({ message: 'id does not exist' });
            }
        });
});

// endpoint to update a single property of a note object identified by an id
userRouter.patch('/:id', (request, response) => {
    const id = request.params.id;
    const userDetail = request.body;

    User.findByIdAndUpdate(id, userDetail)
        .then(userUpdate => {
            if (userUpdate) {
                response.status(200).json({ message: 'note patched successfully' });
            } else {
                response.status(404).json({ message: 'id does not exist' });
            }
        });
});


module.exports = userRouter