require('dotenv').config();
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParse from "body-parser"
import cookieParser from "cookie-parser"
import connectFlash from "connect-flash"
import session from "express-session"
import passport from "passport";
import moment from "moment";


const app = express();

// user moment
app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
});

// enable body parser
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

// cookie parser
app.use(cookieParser("secret"))

// config session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day session
    }
}))

// enable flash messages
app.use(connectFlash())


//Config view engine
configViewEngine(app);

//config passport middleware
app.use(passport.initialize())
app.use(passport.session())

// init all web routes
initWebRoutes(app);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Building a login system with NodeJS is running on port ${port}!`));