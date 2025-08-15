const jwt = require("jsonwebtoken");
const secret = "jwt_secret"

function setUser(user) {
    const payload = {
        _id: user._id,
        email:user.email,
    }
    return jwt.sign(payload, secret, { expiresIn: "1h" });
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
}

module.exports = { setUser, getUser };