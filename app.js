const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

var taskItems = ["Buy Vegetables", "Cook Food", "Eat Food"];
var workItems = [];

app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("list", { listTitle: day, newTaskItems: taskItems });
});

app.post("/", function (req, res) {
  let taskItem = req.body.taskName;

  if (req.body.list === "Work") {
    workItems.push(taskItem);
    res.redirect("/work");
  } else {
    taskItems.push(taskItem);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newTaskItems: workItems });
});

app.post("/work", function (req, res) {
  let item = req.body.taskName;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function () {
  console.log("Server is up and running at port 3000");
});
