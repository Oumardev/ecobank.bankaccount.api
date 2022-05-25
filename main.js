const express = require('express')
const { sequelize } = require('./models')
const app = express()

require('dotenv').config();

const IP_ADDRESS = process.env.ENVIRONMENT == 'DEVELOPMENT' ? process.env.LOCAL_ADDRESS : process.env.SERVER_ADDRESS
const PORT = process.env.ENVIRONMENT == 'DEVELOPMENT' ? process.env.LOCAL_PORT : process.env.SERVER_PORT

app.get('/',(req,res)=>{
    res.send('Bank api')
})

app.listen(PORT, IP_ADDRESS, async()=>{
    try {
        await sequelize.authenticate()
        console.log(`server is running on http://${IP_ADDRESS}:${PORT}`)
    } catch (error) {
        console.log(error)
        console.log('error to connected server to database')
    }
})