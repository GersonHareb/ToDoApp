const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const { newChore, getChores, eraseChore, editChore } = require("./queries");

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

app.get("/", async (_req, res) => {
  try {
    const chores = await getChores();
    res.render("index", { chores });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/", async (req, res) => {
  //newChore
  const chore = req.body.chore;
  try {
    await newChore(chore);
    res.redirect("back");
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await eraseChore(id);
    res.status(200).send("ok");
  } catch (e) {
    res.status(500).send({
      error: "Error al eliminar la tarea",
      code: 500,
    });
  }
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const chore = req.body.chore;
  try {
    await editChore(id, chore);
    res.status(200).send("ok");
  } catch (e) {
    res.status(500).send({
      error: "Error al editar la tarea",
      code: 500,
    });
  }
});
