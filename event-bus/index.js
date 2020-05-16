const express = require('express');
const app = express();
const axios = require('axios');
const port = 4005||process.env.PORT;

app.use(express.json())

app.post('/events',(req,res) => {
    const event = req.body;

    axios.post('http://localhost:4000/events',event)
    axios.post('http://localhost:4001/events',event)
    axios.post('http://localhost:4002/events',event)
    axios.post('http://localhost:4003/events',event)

    res.json({
        status : "OK"
    })
})

app.listen(port)