const express = require('express')
const router = express.Router()
const userController = require('./controllers/userControllers')
const bank_accountsController=require('./controllers/bank_accountsController')
const transactionsController=require('./controllers/transactionsController')
const checkToken = require('./middleware/checkToken')
const validate = require("./middleware/validate")
const schema = require("./validatorSchemas/authValidatorSchema")

router.get('/', (req, res)=>{
    return res.json({
        message: "hello binar"
    })
})

router.post('/auth/register',validate(schema.registerValidator),userController.registerUser)
router.post('/auth/login/', userController.loginUser)
router.get('/users', userController.showAllUsers)
// router.get('/users/:id', userController.showUser)
router.get('/auth/authenticate', checkToken, userController.getUser)

router.post('/accounts', bank_accountsController.registerBanks)
router.get('/accounts', bank_accountsController.showAllBanks)
router.get('/accounts/:id', bank_accountsController.showBank)
//Pas a

router.post('/transactions', transactionsController.createTransaction)
router.get('/transactions', transactionsController.showAllTransactions)
router.get('/transactions/:id', transactionsController.showTransaction)

module.exports=router;
