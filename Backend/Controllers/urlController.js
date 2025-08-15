const shortid  = require("shortid");
const URL = require("../Models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    let { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    const id = shortid();
    await URL.create({
      shortId: id,
      redirectURL: url,
      visitHistory: [],
      createdBy:req.user._id
    });

    return res.json({ shortId: id });
  } catch (err) {
    console.error("Error in /api/url:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}


async function handleRedirectURL(req, res) {
  try {
    const shortid = req.params.id;

    console.log("Looking for shortId:", req.params.id);

    const entry = await URL.findOneAndUpdate(
      { shortId: shortid },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      }
    );
    
    console.log("Found entry:", entry);

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(entry.redirectURL);
  } catch (err) {
    console.error("Error in handleRedirectURL:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleURLAnalytics(req, res) {
  const user = req.user; 
  const result = await URL.find({ createdBy: user._id });

  if (!result || result.length === 0){
    return res.status(404).json({ error: "No URLs found" });
}
  res.json(result);
}


module.exports = {
  handleGenerateNewShortURL,
  handleRedirectURL,
  handleURLAnalytics,
};