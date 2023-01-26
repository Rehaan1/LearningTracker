require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors())

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_DB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=>{
        console.log('Connected to MongoDB Atlas')
    })
    .catch((err) =>{
        console.log('Database Connection Error')
        console.log('-------------------------')
        console.log('Error: '+err)
    })

app.get('/',(req,res) =>{
    res.status(200).json({
        status:200,
        message: 'Captain O\' Captain! The API is up. Refer Docs'
    })
})

app.listen(port, () =>{
    console.log('Server Up and Running')
})