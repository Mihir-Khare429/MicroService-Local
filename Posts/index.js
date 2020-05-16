const express = require('express')
const app = express()
const { randomBytes } = require('crypto') 
const axios = require('axios')
const cors = require('cors')
const port = 4000||process.env.PORT

app.use(cors())
app.use(express.json())

const posts = {}

app.get('/posts',(req,res) => {
    res.send(posts)
})

app.post('/posts',async (req,res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    posts[id] = {
        id : id ,
        title : title
    }

    await axios.post('http://localhost:4005/events',{
        type : 'Post Created',
        data : {
            id,title
        }
    })
    res.status(201).send(posts[id])
})

app.post('/events',(req,res) => {
    console.log('Event Recieved',req.body.type)

    res.send({ });
})

app.listen(port)