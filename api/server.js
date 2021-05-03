// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model.js')

const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    User.find()
    .then(users => {
        console.log(users)
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({
          error: 'something went bad getting the users',
          message: err.message,
          stack: err.stack,
        })
      })
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                message: `There is no user with the id ${req.params.id}`
            })
        } else {
            res.json(user)
        }
    } catch (err) {
        res.status(500).json({
            error: 'Something did not work here'
        })
    }
})

// - `insert` Takes a new user `{ name, bio }` and resolves to the the newly created user `{ id, name, bio }`.
server.post('/api/users/:id', async (req, res) => {
    try {
        const userFromClient = req.body
        if (!userFromClient.name || !userFromClient.bio ) {
            res.status(422).json({
                message: 'Name and Bio are required'
            })
        } else {
            const newUser = await User.insert(userFromClient)
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            error: 'Somethng did not work here'
        })
    }
})

// - `update` Takes an `id` and an existing user `{ name, bio }` and resolves the updated user `{ id, name, bio}` (or null if the id does not exist).
server.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, bio } = req.body
        if(!name || !bio) {
            res.status(422).json({
                message: 'name and bio are required'
            })
        } else {
            const updatedUser = await User.update(id, {name, bio})
            if( !updatedUser) {
                res.status(404).json({
                    message: `No user with id ${req.params.id} exists`
                })
            } else {
                res.json(updatedUser)
            }
        }
    } catch (err) {
        res.status(500).json({
            error: 'Something is not working here'
        })
    }
})
// - `remove` Takes an `id`  and resolves to the deleted user `{ id, name, bio }`.

server.delete('api/users/:id', (req, res) => {
    User.remove(req.params.id)
    .then(deletedUseer => {
        if (!deletedUseer) {
            res.status(404).json({
                message: `User with ${req.params.id} does not exist`
            })
        }
        res.json(deletedUseer)
    })
    .catch(err => {
        res.status(500).json({
            error: 'something went wrong'
        })
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
