// we want only login user comment in blog page.
//remember : In schema use store createdBy:
// same like previous we created schema for comments

const {Schema , model} = require("mongoose");

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    blogId: {                                //Ye batata hai comment kis blog ke andar hai.             
        type: Schema.Types.ObjectId,         //➡️ Stores the ID of the blog on which the comment was made.  , ex: blogId: "68a5f23c4a8b..."
        ref: "blog",                         //➡️ This ObjectId belongs to the Blog model. ,Used for .populate() later. 
    },
    createdBy: {                             //➡️ Ye batata hai comment kis user ne likha hai.
        type: Schema.Types.ObjectId,         //➡️ Stores the ID of the user who wrote the comment.
        ref: "user",                         //➡️ This ObjectId belongs to the User model.
    },
},
    {timestamps: true}
);

const Comment = model("comment", commentSchema);

module.exports = Comment;