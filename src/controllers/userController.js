import userService from "../services/userServices"
import multer from "multer"
import path from "path"



const registerUser = (req, res) => {
    return res.render("register-user", { title: "Admin | Register User", errors: '', success: '', user: req.user })
}


const getAllUsers = async(req, res) => {
    const usersData = await userService.getAllUsers()
    return res.render("all-users", { title: "Admin | All Users", users: usersData, user: req.user })
}


const getUserData = async(req, res) => {
    const userData = await userService.getUserByID(req.params.id)
    return res.render("edit-user", { title: "Admin | Edit User", userData: userData, user: req.user, errors: req.flash('errors') })
}


const deleteUser = (req, res) => {
    userService.deleteUser(req.params.id)
    res.redirect("/all-users")
}

const updateUserData = async(req, res) => {
    const id = req.body.id
    try {

        const userData = {
            name: req.body.name,
            contact_no: req.body.contact_no
        }

        await userService.updateUser(id, userData);
        res.redirect("/all-users")

    } catch (e) {
        req.flash("errors", e.message)
        res.redirect("/edit-user/" + id)
    }
}

const getUserProfileData = async(req, res) => {
    const userData = await userService.getUserByID(req.params.id)
    return res.render("user-profile", { title: "Admin | User Profile", userProfileData: userData, user: req.user })
}

const registerNewUser = async(req, res) => {

    // register new user
    try {
        if (req.body.password === req.body.cpassword) {
            const user = {
                name: req.body.name,
                contact_no: req.body.contact_no,
                profile_pic: req.file.filename,
                email: req.body.email,
                password: req.body.password
            }

            const regStatus = await userService.create(user);

            if (regStatus) {
                req.flash("success", "New User Registered Successfully !")
                return res.render("register-user", { title: "Admin | Register User", user: req.user, errors: '', success: req.flash('success') })
            } else {
                req.flash("errors", "Email Allready Exist !")
                return res.render("register-user", { title: "Admin | Register User", user: req.user, errors: req.flash('errors'), success: '' })
            }
        } else {
            req.flash("errors", "Password and Confirm Password must be same !")
            return res.render("register-user", { title: "Admin | Register User", user: req.user, errors: req.flash('errors'), success: '' })
        }
    } catch (e) {
        req.flash("errors", e)
        return res.render("register-user", { title: "Admin | Register User", user: req.user, errors: req.flash('errors'), success: '' })
    }

}

const Storage = multer.diskStorage({
    destination: "./src/public/images/profile_pics/",
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
}).single("profile_pic")



module.exports = {
    registerUser: registerUser,
    registerNewUser: registerNewUser,
    getAllUsers: getAllUsers,
    getUserProfileData: getUserProfileData,
    getUserData: getUserData,
    updateUserData: updateUserData,
    deleteUser: deleteUser,
    upload: upload
}