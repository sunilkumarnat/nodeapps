import express from "express";
import path from "path";



/**
 * Config view engine for app
 */
const configViewEngine = (app) => {
    app.use('/css', express.static(path.join(__dirname, '../public/css')))
    app.use('/images', express.static(path.join(__dirname, '../public/images')))
    app.use('/js', express.static(path.join(__dirname, '../public/js')))
    app.use('/css/bootstrap', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/css')))
    app.use('/js/bootstrap', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/js')))
    app.use('/jquery', express.static(path.join(__dirname, '../../node_modules/jquery/dist')))
    app.use('/icons', express.static(path.join(__dirname, '../../node_modules/font-awesome/css')))
    app.use('/fonts', express.static(path.join(__dirname, '../../node_modules/font-awesome/fonts')))
    app.use('/material', express.static(path.join(__dirname, '../../node_modules/material-icons/css')))
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
};

module.exports = configViewEngine;