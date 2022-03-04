const dashboard = (req, res) => {
    return res.render("dashboard", { title: "Admin | Dashboard", user: req.user })
}

module.exports = {
    dashboard: dashboard
}