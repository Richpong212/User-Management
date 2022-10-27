const isLoggedIn = async (req, res, next) => {
    try {
        if(req.session.adminId){
            next();
        }else{
            return res.redirect('/adminlogin');
        }
    } catch (error) {
        console.log(error);
    }
 }

 const isLoggedOut = async (req, res, next) => {
    try {
        if(req.session.adminId){
            return res.redirect('/adminlogin');
        }
        next();
    } catch (error) {
        console.log(error);
    }
 }

 module.exports = {
    isLoggedIn,
    isLoggedOut,
 };