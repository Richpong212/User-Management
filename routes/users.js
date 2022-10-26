 const express = require("express");
const { 
    loadRegisterPage, 
    registerUser, 
    loadLoginPage, 
    loginUser, 
    loadHomePage, 
    logOutUser, verifyEmail,
     loadResetVerification, resendVerificationEmailLink, 
     loadForgetPasswordPage, forgetPassword, 
     loadResetPassword, resetPassword, 
     loadEditProfile, 
     editUserProfile
    } = require("../controllers/user.controller");
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

//resend verification email link
userRoute.get('/resend-verification',isLoggedOut,  loadResetVerification)
userRoute.post('/resend-verification',isLoggedOut,  resendVerificationEmailLink) 


// Forget password
userRoute.get('/forget-password',isLoggedOut, loadForgetPasswordPage)
userRoute.post('/forget-password',isLoggedOut, forgetPassword)

//Reset password
userRoute.get('/reset-password',isLoggedOut, loadResetPassword)
userRoute.post('/reset-password',isLoggedOut, resetPassword)

//Edit profile route
userRoute.get('/edit',isLoggedIn, loadEditProfile)
userRoute.post('/edit',upload.single('image'), editUserProfile  )



module.exports = userRoute; 