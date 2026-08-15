const JWT = require("jsonwebtoken");

const secret = "$uperMan@123";

function createTokenForUser(user){    // user is object                  //// This function creates a JWT token for a user using their details

    const payload = {
        _id: user._id,
        email : user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){       // Validate JWT token and return user payload
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
}