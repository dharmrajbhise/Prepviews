const express = require("express");
const app = express();
const show = require("./db/connect");
const path = require("path");
// const popup = require("popups");
const PORT = process.env.PORT || 8787;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, resp) => {
  resp.render("index");
});

app.post("/search", async (req, resp) => {
  let data = await show();
  console.log(req.body.level);
  console.log(req.body.search);
  let result = await data
    .find({
      lang: req.body.search,
    })
    .toArray();

  console.log(result);

  resp.render("result", { user: result });
});

app.get("/add", (req, resp) => {
  resp.render("add");
});

app.post("/add", async (req, resp) => {
  let data2 = await show();
  let result2 = await data2.insertOne({
    Q: req.body.question,
    Ans: req.body.ans,
    level: req.body.level,
    lang: req.body.lang,
  });
  if (result2.acknowledged == true) {
    // popup.alert({ content: "record Saved!" });
    resp.send("<h1>Record saved!</h1>");
  }
  // alert("Record Saved!");
  // resp.send("record saved!");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
