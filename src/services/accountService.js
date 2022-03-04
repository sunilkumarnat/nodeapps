import conection from "../configs/connectDB"
import bcryptjs from "bcryptjs"


const updatePassword = (id, passwords) => {
    return new Promise((resolve, reject) => {
        try {

            const salt = bcryptjs.genSaltSync(10)
            const data = {
                password: bcryptjs.hashSync(passwords.password, salt)
            }

            conection.query("Update users SET ? WHERE id = " + id, data, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(true)
                }
            })

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    updatePassword: updatePassword
}