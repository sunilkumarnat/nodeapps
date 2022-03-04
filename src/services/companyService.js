import conection from "../configs/connectDB"

const create = (company) => {
    return new Promise(async(resolve, reject) => {
        try {

            // email exists or not 
            const checkEmail = await checkEmailCompany(company.email)
            if (checkEmail) {
                reject("Email alrady exists !")
            } else {
                const data = {
                    logo: company.logo,
                    company_name: company.company_name,
                    about_company: company.about_company,
                    conatct_person_name: company.conatct_person_name,
                    email: company.email,
                    contact_no: company.contact_no,
                    address: company.city,
                    city: company.city,
                    state: company.state,
                    pincode: company.pincode

                }

                conection.query("INSERT INTO companies SET ? ", data, (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve("New Company added successfully !")
                    }
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

const getAllCompanies = () => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("SELECT * FROM companies ORDER BY company_name ASC", (err, results) => {
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

const checkEmailCompany = (email) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("SELECT * FROM companies WHERE email = ?", email, (err, results) => {
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

const getCompanyByID = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("SELECT * FROM companies WHERE id = ? ", id, (err, results) => {
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

const updateCompany = (id, data) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("UPDATE companies SET ? WHERE id = " + id, data, (err, results) => {
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

const deleteCompany = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("delete from companies WHERE id =? ", id, (err, results) => {
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
    getAllCompanies: getAllCompanies,
    getCompanyByID: getCompanyByID,
    updateCompany: updateCompany,
    deleteCompany: deleteCompany
}