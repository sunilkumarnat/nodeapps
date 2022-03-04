import accountService from "../services/accountService"
import multer from "multer"
import path from "path"


const changePassword = (req, res) => {
    return res.render("change-password", { title: "Admin | Change Password", errors: '', success: '', user: req.user })
}

const getAccountData = (req, res) => {
    return res.render("account", { title: "Admin | User Account", user: req.user })
}

const updatePassword = async(req, res) => {

    try {
        if (req.body.password === req.body.cpassword) {
            const id = req.body.id
            const data = {
                password: req.body.password
            }

            await accountService.updatePassword(id, data)
            req.flash("success", "Password Successfully Changed !")
            return res.render("change-password", { title: "Admin | Change Password", errors: '', success: req.flash('success'), user: req.user })

        } else {
            req.flash("errors", "Password and Confirm Password must be same !")
            return res.render("change-password", { title: "Admin | Change Password", errors: req.flash("errors"), success: '', user: req.user })
        }

    } catch (e) {
        req.flash("errors", e.message)
        return res.render("change-password", { title: "Admin | Change Password", errors: req.flash("errors"), success: '', user: req.user })
    }

}


module.exports = {
    changePassword: changePassword,
    getAccountData: getAccountData,
    updatePassword: updatePassword
}