const session = require('express-session');
const express = require("express");
const { upload } = require("../middleware/uploadFile");
const { dev } = require("../config");
const { isLoggedIn, isLoggedOut } = require("../middleware/adminAuth");
const { 
        loadLoginView,
        loginAdmin,
        loadAdminHomeView,
        adminLogout,
        loadAdminDashboardView,
        deleteUser,
        loadEditUserView,
        updateUser,
        } = require('../controllers/admin.controller');

const adminRoute = express();


adminRoute.use(session({
    secret: dev.app.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }))

  //Admin Login GET   
adminRoute.get('/adminlogin', isLoggedOut, loadLoginView)

//Admin Login POST
adminRoute.post('/adminlogin', loginAdmin)

// Admin Home GET
adminRoute.get('/adminhome', isLoggedIn, loadAdminHomeView)

// Admin Logout GET
adminRoute.get('/logout',isLoggedIn, adminLogout) 

// Admin Dashboard GET
adminRoute.get('/admindashboard', isLoggedIn,  loadAdminDashboardView)

//Admin delete user
adminRoute.get('/delete-user', isLoggedIn, deleteUser)

//Admin Edit User
adminRoute.get('/edit-user', isLoggedIn, loadEditUserView) 

// Admin Edit User POST
adminRoute.post('/edit-user', isLoggedIn,  updateUser)

module.exports = adminRoute;  