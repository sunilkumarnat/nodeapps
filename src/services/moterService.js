import conection from "../configs/connectDB"
import bcryptjs from "bcryptjs"

const register = (data) => {
    return new Promise((resolve, reject) => {
        try {

            conection.query("INSERT INTO moters SET ? ", data, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve("New Moter added successfully !")
                }
            })

        } catch (e) {
            reject(e);
        }
    })
}

const getAllMoters = () => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("SELECT * FROM moters ORDER BY hp ASC", (err, results) => {
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

const getMoterById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("SELECT * FROM moters WHERE id = ?", id, (err, results) => {
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

const deleteMoter = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("DELETE FROM moters WHERE id = ?", id, (err, results) => {
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

const updateMoter = (id, data) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("UPDATE moters SET ? WHERE id = " + id, data, (err, results) => {
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
    register: register,
    getAllMoters: getAllMoters,
    getMoterById: getMoterById,
    deleteMoter: deleteMoter,
    updateMoter: updateMoter
}