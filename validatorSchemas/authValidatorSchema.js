const {body} = require('express-validator')

const registerValidator = [
    body('name').notEmpty().withMessage("Name is required"),
    body('email').notEmpty().isEmail().withMessage("Email is Required"),
    body('password').notEmpty().withMessage("Password is Required"),
]

const loginValidator = [
    body('emaail').notEmpty().isEmail().withMessage("Name is required"),
    body('password').notEmpty().withMessage("Password is Required"),
]

const changePasswordValidator = [
    body('old_password').notEmpty().withMessage("Name is required"),
    body('password').notEmpty().withMessage("Password is Required")
]

module.exports={
    registerValidator,
    loginValidator,
    changePasswordValidator,
}