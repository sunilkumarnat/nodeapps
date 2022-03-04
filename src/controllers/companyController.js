import multer from "multer"
import path from "path"
import companyService from "../services/companyService"

const registerCompany = (req, res) => {
    return res.render("register-company", { title: "Admin | Register Company", errors: '', success: '', user: req.user })
}

const getCompanyData = async(req, res) => {
    const companieData = await companyService.getCompanyByID(req.params.id)
    return res.render("edit-company", { title: "Admin | Edit Company", company: companieData, user: req.user, errors: req.flash('errors') })
}


const deleteCompany = (req, res) => {
    companyService.deleteCompany(req.params.id)
    res.redirect("/all-companies")
}

const updateCompanyData = async(req, res) => {
    const id = req.body.id

    try {
        const companyData = {
            company_name: req.body.company_name,
            about_company: req.body.about_company,
            conatct_person_name: req.body.conatct_person_name,
            email: req.body.email,
            contact_no: req.body.contact_no,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode
        }

        await companyService.updateCompany(id, companyData);
        res.redirect("/all-companies")
    } catch (e) {
        req.flash("errors", e.message)
        res.redirect("/edit-company/" + id)
    }
}


const Storage = multer.diskStorage({
    destination: "./src/public/images/logos/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

// this code will handle file types like jpeg, jpg, and png
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: Storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // define limit 5mb max file upload size
    },
    fileFilter: fileFilter
}).single("logo")


const getAllCompanies = async(req, res) => {
    const companiesData = await companyService.getAllCompanies()
    return res.render("all-companies", { title: "Admin | All Companies", companies: companiesData, user: req.user })
}

const getCompanyProfileData = async(req, res) => {
    const companyData = await companyService.getCompanyByID(req.params.id)
    return res.render("company-profile", { title: "Admin | Company Profile", companyProfileData: companyData, user: req.user })
}

const registerNewCompany = async(req, res) => {
    // register new customer
    try {
        const company = {
            logo: req.file.filename,
            company_name: req.body.company_name,
            about_company: req.body.about_company,
            conatct_person_name: req.body.conatct_person_name,
            email: req.body.email,
            contact_no: req.body.contact_no,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode
        }
        await companyService.create(company);
        req.flash("success", "New Company Registered Successfully !")
        return res.render("register-company", { title: "Admin | Register Company", user: req.user, errors: '', success: req.flash('success') })
    } catch (e) {
        req.flash("errors", e.message)
        return res.render("register-company", { title: "Admin | Register Company", user: req.user, errors: req.flash('errors'), success: '' })
    }

}






module.exports = {
    registerCompany: registerCompany,
    registerNewCompany: registerNewCompany,
    getAllCompanies: getAllCompanies,
    getCompanyProfileData: getCompanyProfileData,
    getCompanyData: getCompanyData,
    updateCompanyData: updateCompanyData,
    deleteCompany: deleteCompany,
    upload: upload
}