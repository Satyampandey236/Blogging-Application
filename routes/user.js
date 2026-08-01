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
    const user = User.matchPassword(email, password);

    console.log("User", user);
    return res.redirect("/");
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