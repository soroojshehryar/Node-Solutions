const express = require("express");
const app = express();
const port = 5001;

const apiRoutes = require("./routes/apiRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(bodyParser.json());

app.get("/", async (req, res, next) => {
  res.json({ message: "Server is Up" });
});

const connectDB = require("./config/db");
connectDB();

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  next(error);
});
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
