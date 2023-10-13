const express = require('express')
const router = express.Router()
const userController = require('./controllers/userControllers')
const bank_accountsController=require('./controllers/bank_accountsController')
const transactionsController=require('./controllers/transactionsController')

router.get('/', (req, res)=>{
    return res.json({
        message: "hello word"
    })
})

router.post('/users', userController.registerUser)
router.get('/users', userController.showAllUsers)
router.get('/users/:id', userController.showUser)
//Paham pas user tetapi pas account, transaksi kurang paham


router.post('/accounts', bank_accountsController.registerBanks)
router.get('/accounts', bank_accountsController.showAllBanks)
router.get('/accounts/:id', bank_accountsController.showBank)
//Pas a

router.post('/transactions', transactionsController.createTransaction)
router.get('/transactions', transactionsController.showAllTransactions)
router.get('/transactions/:id', transactionsController.showTransaction)

module.exports=router;
