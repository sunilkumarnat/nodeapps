import conection from "../configs/connectDB"
import bcryptjs from "bcryptjs"

const create = (user) => {
    return new Promise(async(resolve, reject) => {
        try {

            // email exists or not 
            const checkEmail = await checkEmailUser(user.email)
            if (checkEmail) {
                reject("Email alrady exists !")
            } else {
                const salt = bcryptjs.genSaltSync(10)
                const data = {
                    name: user.name,
                    contact_no: user.contact_no,
                    profile_pic: user.profile_pic,
                    email: user.email,
                    password: bcryptjs.hashSync(user.password, salt)
                }

                conection.query("INSERT INTO users SET ? ", data, (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve("New user added successfully !")
                    }
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

const checkEmailUser = (email) => {
    return new Promise(async(resolve, reject) => {
        try {
            conection.query("SELECT * FROM users WHERE email = ?", email, (err, results) => {
                if (err) {
                    reject(err)
                }

                if (results.length > 0) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        } catch (e) {
            reject(e);
        }
    })
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("SELECT * FROM users WHERE role = 2 ORDER BY email ASC", (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
        } catch (e) {
            reject(e);
        }
    })
}

const getUserByID = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("SELECT * FROM users WHERE id = ? ", id, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results[0])
            })
        } catch (e) {
            reject(e);
        }
    })
}

const updateUser = (id, userdata) => {
    return new Promise((resolve, reject) => {

        try {
            const data = {
                name: userdata.name,
                contact_no: userdata.contact_no
            }
            conection.query("UPDATE users SET ? WHERE id = " + id, data, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(true)
            })

        } catch (e) {
            reject(e);
        }
    })
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("delete from users WHERE id =? ", id, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(true)
            })
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    create: create,
    getAllUsers: getAllUsers,
    getUserByID: getUserByID,
    deleteUser: deleteUser,
    updateUser: updateUser
}