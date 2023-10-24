const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000
const router = require('./routers')
const swaggerUI = require('swagger-ui-express')
const cors = require('cors')
const swaggerJson = require('./')

app.use(express.json({strict:false}));
app.use(cors())
app.get('*', (req, res)=>{
    return res.status(404).json({
        error: 'End point is not register'
    })
})
app.use('/documentation', swaggerUI.serve, swaggerUI.setup())
app.use('/api/v1', router)
app.listen(PORT, () =>{
    console.log(`Server is runing a PORT ${PORT}`)
})