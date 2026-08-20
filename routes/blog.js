

const {Router} = require("express");

const multer = require('multer');
const path = require('path');

const Blog = require('../models/blog')
const Comment = require("../models/comment");


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

//router (we create route for blog)
router.get('/:id', async(req,res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");    // we use this kui ki ham caahte hai ki blog jisne bhi likha hai uska profile img and name show ho down me : iske help sy createdBy: ObjectId
    const comments = await Comment.find({blogId: req.params.id}).populate(    // we show comment on forntend.
        "createdBy"
    );
    console.log("comments", comments);
    //console.log("blog", blog);      // actuall user object print in terminal     // see in dataabse : createdBy: ObjectId : Ye object id hai or actually yehi user ki id bhi  hai    //_id: ObjectId('655drddc5c'),
    return res.render("blog",{
        user: req.user,                  //we return user and blog also
        blog,
        comments,
    });
});


//Post route for comments.

router.post("/comment/:blogId",async (req,res) => {   //comment per click karne per uss blog id per commemt karaneg.   "Jo bhi value yahan aaye, usko req.params.blogId me store kar do."
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
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