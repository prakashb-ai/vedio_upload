const express  = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const vedios_Router = require('./routers/Vedio_router')
dotenv.config()

app.use(cors({
    origin: "*"
}))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use('/upload/vedio',express.static(__dirname+"/upload/vedio"))
app.use(vedios_Router)
mongoose.connect(process.env.DATABASE_STRING,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(()=>{
    console.log('database is connected to the server')
})
.catch((err)=>{
    console.log(err)
})



app.listen(process.env.PORT,()=>{
    console.log(`server is running on the http://localhost:${process.env.PORT}`)
})
