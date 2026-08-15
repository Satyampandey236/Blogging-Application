

const {Router} = require("express");
const router = Router();

router.get("/add-new", (req, res)=> {
    return res.render("addBlog", {
        user: req.user,              //// because navigation bar blog page per bhi hoga n .
});
});

module.exports = router;