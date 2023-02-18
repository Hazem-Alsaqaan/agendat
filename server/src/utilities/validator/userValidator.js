const {check, param, body} = require("express-validator")
const validationMiddleware = require("../validationMiddleware/validationMiddleware")

const getUsersValidator = [
    check('email').isEmail(),
    check("password").isLength({min: 6}),
    validationMiddleware,
]
module.exports = getUsersValidator
