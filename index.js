const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000
const router = require('./routers')
const swaggerUI = require('swagger-ui-express')
const swaggerJson = require('./')

app.use(express.json({strict:false}));
app.use('/documentation', swaggerUI.serve, swaggerUI.setup())
app.use('/api/v1', router)
app.listen(PORT, () =>{
    console.log(`Server is runing a PORT ${PORT}`)
})