const express = require('express')
const router = express.Router()
const multer = require('multer')
const bodyparser = require('body-parser')
const Vedios = require('../models/Vedio_Schema')
const dotenv = require('dotenv')
dotenv.config()



router.use(bodyparser.json())

const FILE_MAP_TYPE={
    'video/mp4':'mp4',
    'video/mkv':'mkv',
}


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const isValid = FILE_MAP_TYPE[file.mimetype]
        let uploadError = new Error('invalid vedio type')
        if(isValid){
            uploadError = null
        }
        cb(uploadError,'upload/vedio')
    },
    filename: function(req,file,cb){
        const fileName = file.originalname.split('').join('-')
        const extension = FILE_MAP_TYPE[file.mimetype]
        cb(null,`${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({storage:storage})

router.post('/api/vedio/post',uploadOptions.single('vedio'),async(req,res)=>{
    const file = req.file
    if(!file){
        return res.status(400).json({message:"vedio not upload"})
    }
    const filename = file.filename

    const baseurl=`http://localhost:${process.env.PORT}/upload/vedio/`

    const vedio = new Vedios({
        title:req.body.title,
        description:req.body.description,
        vedio:`${baseurl}${filename}`
    })
    const data_save = await vedio.save()
    if(data_save){
        return res.status(200).json({message:"successfully created data"})
    }
    else{
        return res.status(400).json({message:"not created data"})
    }
})  



router.get('/api/get/vedio',async(req,res)=>{
    const get_data = await Vedios.find()
    if(get_data){
        return res.status(200).json({message:"data was found",vedio_details:get_data})
    }
    else{
        return res.status(400).json({message:"data was not found"})
    }
})

router.put('/api/:id',async(req,res)=>{
    const update_data = await Vedios.findByIdAndUpdate(req.params.id)
    if(update_data){
        return res.status(200).json({message:"data was updated",update:update_data})
    }
    else{
        return res.status(400).json({message:"data was not updated"})
    }

})

router.delete('/api/:id',async(req,res)=>{
    const delte_data = await Vedios.findByIdAndDelete(req.params.id)
    if(delte_data){
        return res.status(200).json({message:"data was deleted",delete:delte_data})
    }
    else{
        return res.status(400).json({message:"data was not delted"})
    }
})


module.exports = router