require('dotenv').config()
const{S3Client}=require('@aws-sdk/client-s3')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')

const app=express()
const PORT = process.env.PORT;
app.use(express.json())

const s3 = new  S3Client({
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    },
    region:process.env.REGION

})

const upload = multer({
    storage:multerS3({
        s3:s3,
        bucket:process.env.AWS_S3_BUCKET,
        key:function(req,file,cb){
            cb(null,file.originalname)
        }
    })

})

app.post('/upload',upload.array('photos'),(req,res)=>{
    res.send(req.files)
})

app.get('/',(req,res)=>{
    res.send(`.env test : ${process.env.AWS_S3_BUCKET}`)
})