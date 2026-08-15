// for adding a blog we need a schema

const { Schema, model} = require("mongoose");

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref:"user",   // ye user old model ka name hai
    },

},{timestamps: true}
);

const Blog = model('blog', blogSchema);    // blog is a model name 
module.exports = Blog;