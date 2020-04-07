const express = require('express')
const cors = require('cors')

let users = []

const port = 5000

const server = express()
server.use(express.json())
server.use(cors())

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    const { name, bio } = newUser
    if (name.length !== 0 && bio.length !== 0) {
        users.push(newUser)
        newUser.id = users.length
        if (users.find(i => i.id === newUser.id)) {
            res.status(201).json(users)
        } else {
            res.status(500).json({ errorMessage: "there was an error while saving the user to the database" })
        }
    } else {
        res.status(400).json({ error: "Please provide a name and bio for the user" })
    }
})

server.get('/api/users', (req, res) => {
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(500).json({ errorMessage: "the users information could not be retrieved" })
    }
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    const user = users.find(u => u.id === Number(id))
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: "the user with the specified id does not exist" })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    if (users.find(i => i.id === Number(id))) {
        users = users.filter(item => item.id !== Number(id))
        if (users.find(i => i.id === Number(id))) {
            res.status(500).json({ errorMessage: "user could not be deleted" })
        } else {
            res.status(200).json(users)
        }
    } else {
        res.status(404).json({ message: "the user with the specified id does not exist" })
    }
})

server.put('/api/users/:id', (req, res) => {
    const updateUser = req.body
    const { id } = req.params
    const oldUser = users.find(i => i.id === Number(id))
    if (oldUser) {
        if (req.body.name.length > 0 || req.body.bio.length > 0) {
            if (oldUser === updateUser) {
                res.status(500).json({ errorMessage: "the user information could not be modified" })
            } else {
                updateUser.id = users.length
                users = [
                    ...users.slice(0, oldUser.id),
                    updateUser,
                    users.slice(oldUser.id + 1)
                ]

                res.status(200).json(users)
            }
        } else {
            res.status(400).json({ errorMessage: "please provide a name and bio for the user" })
        }
    } else {
        res.status(404).json({ message: "the user with the specified id does not exist" })
    }
})

server.listen(port, () => console.log(`server listening on port:${port}`))