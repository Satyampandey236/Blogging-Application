

const {Router} = require("express");

const multer = require('multer');
const path = require('path');

const Blog = require('../models/blog')

const router = Router();


//MULTER
//we create storage for multer (take from documentation);
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,path.resolve(`./public/uploads/`));  // we store coverimage / file at this location .    //req.user._id: it means : har user ka apna apna folder hoga. 
    },
    filename: function (req , file, cb){
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});
const upload = multer({storage: storage});



router.get("/add-new", (req, res)=> {
    return res.render("addBlog", {
        user: req.user,              //// because navigation bar blog page per bhi hoga n .
    });
});

//we use multer for  multer for file   : npm i multer ; open documentatio of multer.
// POST ROUTE   // and action on form after witten this

router.post("/",upload.single('coverImage'),async(req,res) => {
    // console.log(req.body);
    // console.log(req.file);
    const {title,body} = req.body
    const blog = await Blog.create({       // its create blog for us .
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`

    });
    return res.redirect(`/blog/${blog._id}`);
});


module.exports = router;