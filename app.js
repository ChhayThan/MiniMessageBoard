const express = require("express");
const path = require("path");
const app = express();

const indexRouter = require("./routes/indexRouter");

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

app.use("/", indexRouter);

app.listen(PORT, () => console.log(`Server is running: Port ${PORT}`));
