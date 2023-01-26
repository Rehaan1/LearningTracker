const mongoose = require('mongoose')

const Schema = mongoose.Schema

const learningDataSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    site:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
})

const Learning = mongoose.model('learning', learningDataSchema)
module.exports = Learning