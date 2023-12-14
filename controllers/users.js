const userRouter = require('express').Router();
const User = require('../models/user')

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

//endpoint to create new user upon user request
userRouter.post('/', (request, response) => {
    const user = new User(request.body)

    user.save()
        .then(() => {
            response.status(201).json({ message: 'user created successfully' })
        })
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