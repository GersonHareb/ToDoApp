const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist")
);
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));

app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

app.get("/", (req, res) => {
  res.render("index");
});
