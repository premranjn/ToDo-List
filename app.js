const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

var taskItems = ["Buy Vegetables", "Cook Food", "Eat Food"];
app.get("/", function (req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", options);
  res.render("list", { kindOfDay: day, newTaskItems: taskItems });
});

app.post("/", function (req, res) {
  var taskItem = req.body.taskName;
  taskItems.push(taskItem);
  res.redirect("/");

});

app.listen(3000, function () {
  console.log("Server is up and running at port 3000");
});


