 const express = require("express");
const { loadRegisterPage, registerUser, loadLoginPage, loginUser, loadHomePage, logOutUser, verifyEmail, loadResetVerification, resendVerificationEmailLink } = require("../controllers/user.controller");
const { upload } = require("../middleware/uploadFile");
const session = require('express-session');
const { dev } = require("../config");
const { isLoggedIn, isLoggedOut } = require("../middleware/auth");

 const userRoute = express();

 userRoute.use(session({
    secret: dev.app.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }))

//Register page
userRoute.get('/register', isLoggedOut, loadRegisterPage)
userRoute.post('/register',upload.single('image'), registerUser)

//Login page
userRoute.get('/login', isLoggedOut, loadLoginPage)
userRoute.post('/login', loginUser)
userRoute.get('/home', isLoggedIn, loadHomePage)
userRoute.get('/logout',isLoggedIn, logOutUser)
userRoute.get('/verify',isLoggedOut, verifyEmail)

//reset password
userRoute.get('/resend-verification',isLoggedOut,  loadResetVerification)
userRoute.post('/resend-verification',isLoggedOut,  resendVerificationEmailLink) 




module.exports = userRoute; 