const express = require('express')
const app = express()
const { randomBytes } = require('crypto')
const axios = require('axios')
const cors = require('cors')
const port = 4001||process.env.PORT

app.use(express.json())
app.use(cors())

var commentByPostId = {}

app.get('/posts/:id/comments' ,  (req,res) => {
    res.status(201).send(commentByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments' , async (req,res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body

    const comments = commentByPostId[req.params.id] || []
    comments.push({id:id,comment:content,status : 'pending'})
    commentByPostId[req.params.id] = comments

    await axios.post('http://localhost:4005/events' ,{
        type : 'Comment Created',
        data : {
            id,content,postid : req.params.id,status : 'pending'
        }
    })

    res.status(201).send(comments)
})

app.post('/events',async (req,res) => {
    console.log('Event Recieved',req.body.type)
    const  { type ,data} = req.body
    if(type == "Comment Moderated"){
        const { id , postid , status} = req.body
        const comments = commentByPostId[postid]
        const comment = comments.find(comment => {
            return comment.id == id
        })
        comment.status = status
    }
    await axios.post('http://localhost:4005/posts',{
        type : "Comment Updated",
        data : req.body
    })
    res.send({ });
})

app.listen(port)