const session = require('express-session');
const express = require("express");
const { upload } = require("../middleware/uploadFile");
const { dev } = require("../config");
const { isLoggedIn, isLoggedOut } = require("../middleware/auth");

const adminRoute = express();

adminRoute.use(session({
    secret: dev.app.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }))


module.exports = adminRoute;