const { getUser } = require("../Service/Auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const user = getUser(userUid);

  if (!user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  req.user = user;
  next();
}

module.exports = { restrictToLoggedinUserOnly };
