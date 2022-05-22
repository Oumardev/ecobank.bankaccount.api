const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('Test deployement with ssh key')
})

app.listen(4200,'86.107.197.161',()=>{
    console.log('server is running on http://localhost:4200')
})