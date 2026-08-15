const {Router} = require("express");
const User = require('../models/user');

const router = Router();


router.get("/signin", (req , res) => {
    return res.render("signin");
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

//signin

router.post("/signin", async(req,res) =>{
    const {email, password} = req.body;    //signin ke waqt user email or password dega.
    //const user = await User.matchPasswordAndGenerateToken(email, password);
     try {const token = await User.matchPasswordAndGenerateToken(email, password);

    console.log("token", token);    // 1st token is lable and 2nd one is generated token
    return res.cookie("token",token).redirect("/");   // agr user correct pass deta hai toh ham redirect kar denge Home page per.  //creates a cookie in the user's browser:   // Login successful ->JWT token generated ->Token stored in browser cookie -> Redirect user to /
    }catch (error){
        return res.render("signin", {                // agr kuch error aa jayega toh we rendering of signin page.
            error: "Incorrect Email or Password",     //passes the error message to your EJS page.
        });
    }
});



//signup
router.post("/signup", async(req ,res) => {
    const { fullName, email , password } = req.body;
    await User.create({
        fullName,
        email,
        password,     
    });
    return res.redirect("/");   // after sigup render to home page.
});

module.exports = router;