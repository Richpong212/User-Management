require ('dotenv').config();

exports.dev={
    db:{
        url: process.env.DB_URL|| '',
    },
    app:{
        port: process.env.SERVER_PORT|| 3000, 
        SESSION_SECRET: process.env.SESSION_SECRET|| 'keyboard cat',
        authEMAIL: process.env.AUTH_EMAIL|| '',
        authPASSWORD: process.env.AUTH_EMAIL_PASSWORD|| '',
    }
}