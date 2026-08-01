const path = require("path");

const express = require("express");
const mongoose = require("mongoose");

const userRoute = require('./routes/user')

const app = express();

const PORT = 8000; // yaha jo port hai wah ham decide nhi karange, kui ki jis cloud per deploy karange uss per depened karega wahi hame port provide karega .



//connect mongodb 
mongoose
    .connect('mongodb://localhost:27017/blogify')
    .then( e => console.log("MongoDb Connected"));






// Middleware wo hota hai jo request/response ke beech me kaam karta hai (jaise app.use(...)).Ye app.set(...) lines configuration settings hain


app.set('view engine', 'ejs')          //Ye application settings hote hain jo Express ko batate hain,res.render("home") likhoge, Express samjhega ki home.ejs file render karni hai.
app.set("views",path.resolve("./views"));

//mongoosh middleware: 
// Converts form data (application/x-www-form-urlencoded) into req.body.
// Without this middleware, req.body will be undefined for HTML form submissions.


app.use(express.urlencoded ({extended:false}));             // Parses HTML form data and makes it available in req.body.


//route
app.get('/', (req, res)=>{
    res.render("home");
});

app.use('/user',userRoute);

app.listen(PORT, ()=> console.log(`Server Started at PORT:${PORT}`));






//in home.ejs we take bootstrip css and js , but hamare jitane bhi page honge sabke liye css and js hoga but ye good things nhi hai isliye ham algar kar denge .

//we created partials folder in views; partials is a like a component, we created head.ejs, 
