const express = require('express')
const router = express.Router()
const userController = require('./controllers/userControllers')
const profileController=require('./controllers/profileControllers')
const bank_accountsController=require('./controllers/bank_accountsController')

router.get('/', (req, res)=>{
    return res.json({
        message: "hello word"
    })
})

router.post('/users', userController.registerUser)
router.get('/showUsers', userController.showAllUsers)

router.post('/profiles', profileController.registerProfile)
router.get('/showProfiles', profileController.showAllProfiles)

router.post('/account', bank_accountsController.registerBanks)
router.get('/Showaccounts', bank_accountsController.showAllBank)

module.exports=router;
