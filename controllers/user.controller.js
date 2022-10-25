const { securePassword, comparePassword } = require("../config/securePassword");
const user= require("../models/users.model");
const { sendVerificationEmail } = require("../views/utils/sendVerificationEmail");



 const loadRegisterPage = async (req, res) => {
    try {
        res.status(200).render("register");
    } catch (error) {
         res.status(500).send({
            error: error.message
         });
    } 
 } 

 //load home
 const loadHomePage = async (req, res) => {
    try {
        res.status(200).render("home");
    } catch (error) {
         res.status(500).send({
            error: error.message
         });
    } 
 } 

 //Login page
 const loadLoginPage = async (req, res) => {
    try {
        res.status(200).render("login");
    } catch (error) {
         res.status(500).send({
            error: error.message
         });
    } 
 } 

 const registerUser = async (req, res) => {
     const password = req.body.password;
     const hashpassword = await securePassword(password);
    try {
        const newUser =  new user({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashpassword,
            image: req.file.filename,
            isAdmin: 0,
        })
       const userData = await newUser.save();
       if(userData){
             sendVerificationEmail(userData.name, userData.email, userData._id);
            res.status(200).render('register', {message: "User registered successfully"});
       }else{
        res.status(4040).send({
            error: 'route not found'
         });
       }
    } catch (error) {
         res.status(500).send({
            error: error.message
         });
    } 
 }

 //const Login user
 const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userData = await user.findOne({email: email});
        
        if(userData){
          //compare password
            const isMatch = await comparePassword(password, userData.password);
            if(isMatch){
                if(userData.isVerify){
                    req.session.userId = userData._id;
                    res.redirect('/home');
                } else {
                    res.status(200).render('login', {JSON: "Please verify your email"});
                }

            } else{
                res.status(404).send({
                    error: 'enter correct password or email'
                 });
            }
        }else{
            res.status(500).send({
                error: 'please register first'
             });
        }
        
    } catch (error) {
            res.status(500).send({
                error: error.message
            });
    }
 }

 //logout user
 const logOutUser = async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).redirect("/login");
    } catch (error) {
         res.status(500).send({
            error: error.message
         });
    } 
 } 

 //verify email
    const verifyEmail = async (req, res) => {
        try {
            const id= req.query.id;
            const userUpdated = await user.updateOne({_id: id}, {
                $set: {
                    isVerify: 1
                }
            })
            if(userUpdated){
                res.render('verification');
            }else{
                res.status(404).send({
                    error: 'route not found'
                 });
            }
             
        } catch (error) {
            res.status(500).send({
                error: error.message
            });
        }
    }

    //resend verification email
    const loadResetVerification = async (req, res) => {
        try {
            res.render('resend-verification');
        } catch (error) {
            res.status(500).send({
                error: error.message
            });
        }
    }

    const resendVerificationEmailLink = async (req, res) => {
        try {
            const email = req.body.email;
            const userData = await user.findOne({email: email});
            if(userData){
                if(userData.isVerify){
                    res.status(200).send('<h1>Already verified</h1>');
                }else {
                    sendVerificationEmail(userData.name, userData.email, userData._id);
                    res.status(200).render('resend-verification', {JSON: "Email sent successfully"});
                }
                
            }else{
                res.status(404).send('<h1>Email not found</h1>');
            }
        } catch (error) {
            res.status(500).send({
                error: 'email not found'
            });
        }
    }

module.exports = {
    loadRegisterPage,
    registerUser,
    loadLoginPage,
    loginUser,
    loadHomePage,
    logOutUser,
    verifyEmail,
    loadResetVerification,
    resendVerificationEmailLink

}