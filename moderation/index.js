const express = require('express')
const app = express()
const axios =  require('axios')
const cors = require('cors')
const port = 4003||process.env.port

app.use(express.json())
app.use(cors())

app.post('/events',async (req,res) => {
    const { type ,data } = req.body;
    if(type == "Comment Created"){
        const status = data.content.includes('orange') ? 'rejected' : 'approved' ;

        await axios.post('http://localhost:4005/events',{
            type : 'Comment Moderated',
            data : {
                id : data.id,
                postid : data.postid,
                status,
                content : data.content
            }
        })
        console.log(status)
    }
    res.send({})
})