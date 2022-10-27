const user = require("../models/users.model");
const { securePassword, comparePassword } = require("../config/securePassword");


// Load Login Admin View
const loadLoginView = (req, res) => {
try {
    res.status(200).render('adminlogin' );
} catch (error) {
    res.status(500).json({ message: error.message }); 
}}

// Login Admin POST
const loginAdmin = async (req, res) => { 
    try {
        const {email, password} = req.body;
        const adminData = await user.findOne({email: email});
        
        if(adminData){
          //compare password 
            const isMatch = await comparePassword(password, adminData.password);
            if(isMatch){ 
                if(adminData.isVerify){
                    req.session.adminId = adminData._id;
                    res.redirect('/adminhome');
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
        res.status(500).json({ message: error.message });
    }
}

// Load Admin Home View
const loadAdminHomeView = async (req, res) => {
    try {
        const admin = await user.findById(req.session.adminId);
        res.status(200).render('adminhome' ,{admin});
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

// Admin Logout GET
const adminLogout = (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/adminlogin');
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

//Load DashBoard View
const loadAdminDashboardView = async (req, res) => {
    try {
        //search 
        const search = req.query.search ? req.query.search : '';
        //Paganition
        const {page=1, limit=2} = req.query
        const userCount = await user.find({isAdmin:false,
            $or: [
                {name: {$regex:'.*' + search + '.*', $options:'i'}}, 
                {email: {$regex:'.*' + search + '.*', $options:'i'}}, 

            ] 
        }).countDocuments();        

        const users = await user.find({ 
            isAdmin: false,
            $or: [
                {name: {$regex:'.*' + search + '.*', $options:'i'}}, 
                {email: {$regex:'.*' + search + '.*', $options:'i'}}, 
            ] 
        }).limit(limit).skip((page-1)*limit)
        res.status(200).render('admindashboard', {
            users,
            totalPages: Math.ceil(userCount/limit),
            currentPage: Number(page),
            next: page+1,
            prev: page-1,
        }); 

    } catch (error) {
         
    }
}

//delete user
const deleteUser = async (req, res) => {
    try {
      const userData =   await user.findByIdAndDelete({_id: req.query.id});
      console.log(userData);
       if(userData){
           res.redirect('/admindashboard');
       }else{
              res.status(500).json({
                error: 'user not deleted'
              });
       }
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    } 
}

// Edit User By Admin
const loadEditUserView = async (req, res) => {
    try {
        const userData = await user.findById({_id: req.query.id});
        if(userData){
            res.status(200).render('adminedit', {userData});
        }else{
            res.status(500).json({
                error: 'user not found'
              });
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

// Update User By Admin
const updateUser = async (req, res) => {
    try {
         const id = req.query.id;
         const userData = await user.findByIdAndUpdate({_id: id}, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    isVerify: req.body.verify
                }
         });
         console.log(userData);
         if(userData){
            res.redirect('/admindashboard');
         }else{
            res.status(500).json({
                error: 'user not updated'
              });
         }
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}



module.exports = {
    loadLoginView,
    loginAdmin,
    loadAdminHomeView,
    adminLogout,
    loadAdminDashboardView,
    deleteUser,
    loadEditUserView,
    updateUser
};  