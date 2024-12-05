const express=require('express');
const app=express(); 
const cors=require('cors')

const dotenv=require('dotenv')
const path=require('path')

const connectDatabase=require('./config/connectDatabase.js')

dotenv.config({path: path.join(__dirname,'config','config.env') })

const products=require('./routes/product.js')
const orders=require('./routes/order.js')

connectDatabase();

app.use(express.json())
app.use(cors())
app.use('/api/v1/',products)
app.use('/api/v1/',orders)


app.listen(process.env.PORT,()=>{
    console.log(`server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})