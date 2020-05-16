const express = require('express')
const app = express()
const axios =  require('axios')
const cors = require('cors')
const port = 4002||process.env.PORT

app.use(express.json())
app.use(cors())

const posts = {}

app.get('/posts',(req,res) => {
    res.send(posts);
})

app.post('/events',(req,res) => {
    const type = req.body.type
    if( type == 'Post Created'){
        posts[req.body.data.id]={
            id : req.body.data.id,
            title : req.body.data.title,
            comments : []
        }
    }
    else if(type == "Comment Updated"){
        const post = posts[req.body.data.postid]
        const comment = post.comments.find(comment => {
            return comment.id = req.body.data.id
        }) 
        comment.status = req.body.data.status
        comment.content = req.body.data.content
    }
    else if(type == "Comment Created"){
        const postID = req.body.data.postid
        const resposneObj = posts[postID]
        resposneObj.comments.push({ id : req.body.data.id , content :req.body.data.content,status :req.body.data.status})
    }
})

app.listen(port);