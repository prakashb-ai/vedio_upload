const mongoose = require('mongoose')
const VedioSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    vedio:{
        type:String,
        required:true
    }
},
    {
        timestamps:true
    }
)

module.exports = mongoose.model('vedio',VedioSchema)