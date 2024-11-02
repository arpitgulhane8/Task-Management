const express = require("express");
const cors = require("cors");
const path = require("path");
const authroute = require("./routes/authrout/index")
const taskroute = require("./routes/taskrout/index")

const app = express();

app.use(
  cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
    exposedHeaders: ["auth-token"],
  })
);

app.use(express.json());

app.use(express.static(path.join("public")));

app.use("/api/auth",authroute);
app.use("/api/task",taskroute);

module.exports = app;