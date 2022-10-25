const nodemailer = require("nodemailer");
const { dev } = require("../../config");


exports.sendVerificationEmail = async (name,email,_id) => {
  try {    
  
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: dev.app.authEMAIL , 
          pass: dev.app.authPASSWORD, 
        },
      });

      const mailOptions = {
          from: dev.app.authEMAIL, // sender address
          to: email, // list of receivers
          subject: "Verification", // Subject line
          //text: "Hello world?", // plain text body
          html: `<p> Welcome ${name} <a href='http://localhost:9000/verify?id=${_id}' >click here to verify</a> </p>`, // html body
      }
    
       await transporter.sendMail(mailOptions, (err, info) => {
          if(err){
              console.log(err);
          }else{
            console.log("Message sent: %s", info.response);  
          }
       }); 
    
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    } catch (error) {
      console.log(error);
    }
    
  }
;  