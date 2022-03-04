import { check } from "express-validator"

const validationCompanyRegister = [
    check("email", "Invalid Email Address !").isEmail().trim(),
    check('contact_no', "Invalid Contact Number. Contact Number must be in numaric !").isNumeric().isLength({ min: 10 }).trim(),
]

const validationUserRegister = [
    check("email", "Invalid Email Address !").isEmail().trim(),
    check('password', "Invalid Password. Password must be at least 4 chars long !").isLength({ min: 4 }),
    check('cpassword', "Passwors & Confirm Password must be same !").custom((value, { req }) => {
        return value === req.body.password
    })
]

module.exports = {
    validationCompanyRegister: validationCompanyRegister,
    validationUserRegister: validationUserRegister
}