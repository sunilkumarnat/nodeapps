import moterService from "../services/moterService"

const moter = (req, res) => {
    return res.render("register-moter", { title: "Admin | Register Moter", errors: '', success: '', user: req.user })
}

const editMoter = async(req, res) => {
    const moterdata = await moterService.getMoterById(req.params.id)
    return res.render("edit-moter", { title: "Admin | Edit Moter", errors: req.flash("errors"), success: '', user: req.user, moter: moterdata })
}

const deleteMoter = async(req, res) => {
    const moterdata = await moterService.deleteMoter(req.params.id)
    res.redirect("/all-moters")
}

const updateMoter = async(req, res) => {
    const id = req.body.id
    try {

        const moterData = {
            hp: req.body.hp,
            rpm: req.body.rpm,
            current_consumption: req.body.current_consumption,
            kilovolt: req.body.kilovolt,
            company: req.body.company,
            model: req.body.model
        }

        await moterService.updateMoter(id, moterData);
        res.redirect("/all-moters")
    } catch (e) {
        req.flash("errors", e.message)
        res.redirect("/edit-moter/" + id)
    }
}


const registerMoter = async(req, res) => {
    // register new user
    try {
        const moterData = {
            hp: req.body.hp,
            rpm: req.body.rpm,
            current_consumption: req.body.current_consumption,
            kilovolt: req.body.kilovolt,
            company: req.body.company,
            model: req.body.model
        }
        await moterService.register(moterData);
        req.flash("success", "New Moter Registered Successfully !")
        return res.render("register-moter", { title: "Admin | Register Moter", user: req.user, errors: '', success: req.flash('success') })
    } catch (e) {
        req.flash("errors", e)
        return res.render("register-moter", { title: "Admin | Register Moter", user: req.user, errors: req.flash('errors'), success: '' })
    }
}


const getAllMoters = async(req, res) => {
    const motersData = await moterService.getAllMoters()
    return res.render("all-moters", { title: "Admin | All Moters", moters: motersData, user: req.user })
}



module.exports = {
    moter: moter,
    registerMoter: registerMoter,
    getAllMoters: getAllMoters,
    editMoter: editMoter,
    deleteMoter: deleteMoter,
    updateMoter: updateMoter
}