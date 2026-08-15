// ham yaha middleware abnayange jo har request ke token ko check karega . agar user login hai toh uska name show hoga home page per , agar login nhi hai toh signing ka option show hoga.

// const { validate } = require("../models/user");
const{ validateToken} = require("../services/authentication");

// we need to use cookie parser

function checkForAuthenticationCookie(cookieName){
    return (req,res , next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
        next();   // we call next function
        }

    try {
        const userPayload = validateToken(tokenCookieValue);
        req.user = userPayload;
        
        }catch(error){}
        next();
    };
    
    
}

module.exports = {
    checkForAuthenticationCookie,       // we install cookie parser : npm i cookie-parser , ye bhi middleware hai
};