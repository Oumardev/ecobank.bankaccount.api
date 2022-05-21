const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('Welcome to Apoloan release API new version')
})

app.listen(4200,'86.107.197.161',()=>{
    console.log('server is running on http://localhost:4200')
})