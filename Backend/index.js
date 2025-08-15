const express = require("express");
const urlRouter = require("./Routes/urlRouter");
const userRouter = require("./Routes/userRouter");
const { restrictToLoggedinUserOnly } =
  require("./Middlewares/AuthMiddleware");
const { connectToMongoDB } = require("./Configs/Connection");
const app = express();
const cookieParser = require("cookie-parser");
const port = 3000;

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(cookieParser());

connectToMongoDB("mongodb://localhost:27017/URLShortner")
  .then(() => {
    console.log("Connected to Mongodb...");
  })
  .catch((err) => {
    console.log("Couldn't connect to mongodb:", err);
  });

app.use("/api/url", restrictToLoggedinUserOnly, urlRouter);

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}...`);
});
