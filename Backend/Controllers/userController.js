const User = require("../Models/user");
const {setUser} = require("../Service/Auth")

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    })
    const data = { "success": true, "message": "User registered successfully" };
    return res.json(data);
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const  token = setUser(user);
      res.cookie("uid", token, token, { httpOnly: true, maxAge: 3600000 });
      return res.json({ success: true, message: "User login successful" });
    } else {
      return res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}


module.exports = { handleUserSignup,handleUserLogin};