const express = require('express')
require('./db/mongoose')
const User = require('./model/user.js')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('', (req, res) => {
    res.send('Welcome to node with mongoDB')
})

app.post('/user', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.send(e)
    })
})

app.get('/user/:id', (req, res) => {
    // console.log('object',req.params.id);
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send('No user')
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send('error')
    })
})

app.listen(port, () => {
    console.log('Server start in port ' + port)
})