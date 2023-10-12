const express = require('express')
const router = express.Router()
const userController = require('./controllers/userControllers')
const bank_accountsController=require('./controllers/bank_accountsController')

router.get('/', (req, res)=>{
    return res.json({
        message: "hello word"
    })
})

router.post('/users', userController.registerUser)
router.get('/users', userController.showAllUsers)
router.get('/users/:id', userController.showUser)

router.post('/accounts', bank_accountsController.registerBanks)
router.get('/accounts', bank_accountsController.showAllBank)
router.get('/accounts/:id', bank_accountsController.showBank)

router.post('/transactions', bank_accountsController.registerBanks)
router.get('/transactions', bank_accountsController.showAllBank)
router.get('/transactions/:id', bank_accountsController.showAllBank)

module.exports=router;
