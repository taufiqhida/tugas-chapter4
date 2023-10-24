const bcrypt = require('bcrypt')
const {isStrongPassword} = require("validator");

const cryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(5)
    return bcrypt.hash(password, salt)
}

module.exports = {
    cryptPassword
}