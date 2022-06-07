const express = require('express')
const { sequelize } = require('./models')
const app = express()
const { connectAccountToApoloan, debitBalance, creditBalance, getBankAccount } = require('./middleware/bankaccount')
require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const IP_ADDRESS = process.env.ENVIRONMENT == 'DEVELOPMENT' ? process.env.LOCAL_ADDRESS : process.env.SERVER_ADDRESS
const PORT = process.env.ENVIRONMENT == 'DEVELOPMENT' ? process.env.LOCAL_PORT : process.env.SERVER_PORT

app.post('/ecobank/api/connectaccounttoapoloan',connectAccountToApoloan,(req,res)=>{})
app.post('/ecobank/api/debitbalance',debitBalance,(req,res)=>{})
app.post('/ecobank/api/creditbalance',creditBalance,(req,res)=>{})
app.post('/ecobank/api/getbankaccount',getBankAccount,(req,res)=>{})

app.listen(PORT, IP_ADDRESS, async()=>{
    try {
        await sequelize.authenticate()
        console.log(`server is running on http://${IP_ADDRESS}:${PORT}`)
    } catch (error) {
        console.log('error to connected server to database')
    }
})