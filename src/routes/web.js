import express from "express";
import dashboardControler from "../controllers/dashboardController";
import companyController from "../controllers/companyController";
import userController from "../controllers/userController";
import loginController from "../controllers/loginController";
import passport from "passport";
import initPassportLocal from "../controllers/passportController";
import deviceController from "../controllers/deviceController";
import moterController from "../controllers/moterController";
import accountController from "../controllers/accountController"


// Init all passport
initPassportLocal();

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, dashboardControler.dashboard);
    router.get("/login", loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    // company route
    router.get("/register-company", loginController.checkLoggedIn, companyController.registerCompany);
    router.get("/all-companies", loginController.checkLoggedIn, companyController.getAllCompanies);
    router.post("/register-company", loginController.checkLoggedIn, companyController.upload, companyController.registerNewCompany);
    router.get("/company-profile/:id", loginController.checkLoggedIn, companyController.getCompanyProfileData);
    router.get("/edit-company/:id", loginController.checkLoggedIn, companyController.getCompanyData);
    router.get("/delete-company/:id", loginController.checkLoggedIn, companyController.deleteCompany);
    router.post("/edit-company", loginController.checkLoggedIn, companyController.updateCompanyData);

    // users route
    router.get("/register-user", loginController.checkLoggedIn, userController.registerUser);
    router.post("/register-user", loginController.checkLoggedIn, userController.upload, userController.registerNewUser);
    router.get("/all-users", loginController.checkLoggedIn, userController.getAllUsers);
    router.get("/user-profile/:id", loginController.checkLoggedIn, userController.getUserProfileData);
    router.get("/edit-user/:id", loginController.checkLoggedIn, userController.getUserData);
    router.get("/delete-user/:id", loginController.checkLoggedIn, userController.deleteUser);
    router.post("/edit-user/:id", loginController.checkLoggedIn, userController.updateUserData);

    // account router
    router.get("/account", loginController.checkLoggedIn, accountController.getAccountData);
    router.get("/change-password", loginController.checkLoggedIn, accountController.changePassword);
    router.post("/change-password", loginController.checkLoggedIn, accountController.updatePassword);

    // device data calculation and history data insert route
    router.get("/insert", deviceController.insert);
    router.get("/register-device", loginController.checkLoggedIn, deviceController.registerDevice);
    router.post("/register-device", loginController.checkLoggedIn, deviceController.registerNewDevice);
    router.get("/all-devices", loginController.checkLoggedIn, deviceController.getDevices)
    router.get("/edit-device/:id", loginController.checkLoggedIn, deviceController.editDevices)
    router.post("/edit-device", loginController.checkLoggedIn, deviceController.updateDevices)
    router.get("/delete-device/:id", loginController.checkLoggedIn, deviceController.deleteDevices)

    // logout route
    router.get("/logout", loginController.logOut);

    // connect device , moter to company
    router.get("/register-device-to-company", loginController.checkLoggedIn, deviceController.registerDeviceToCompany)
    router.post("/register-device-to-company", loginController.checkLoggedIn, deviceController.registerNewDeviceToCompany)

    // moter route
    router.post("/register-moter", loginController.checkLoggedIn, moterController.registerMoter);
    router.get("/register-moter", loginController.checkLoggedIn, moterController.moter);
    router.get("/edit-moter/:id", loginController.checkLoggedIn, moterController.editMoter);
    router.post("/edit-moter", loginController.checkLoggedIn, moterController.updateMoter);
    router.get("/delete-moter/:id", loginController.checkLoggedIn, moterController.deleteMoter);
    router.get("/all-moters", loginController.checkLoggedIn, moterController.getAllMoters);


    // use route
    return app.use("/", router);
};
module.exports = initWebRoutes;