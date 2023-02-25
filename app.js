const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/todolistDB', { useNewUrlParser: true });

mongoose.set("strictQuery", true);


const express = require("express");
const bodyParser = require("body-parser");

const itemSchema = new mongoose.Schema({
    name: String,
})

const Item = new mongoose.model("list", itemSchema);


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    let today = new Date();
    // Using Switch case 
    // var day = "";
    // var currentday=today.getDay();
    // switch (currentday) {
    //     case 0:
    //         day="Sunday";
    //         break;
    //     case 1:
    //         day="Monday";
    //         break;
    //     case 2:
    //         day="Tuesday";
    //         break;
    //     case 3:
    //         day="Wednesday";
    //         break;
    //     case 4:
    //         day="Thrusday";
    //         break;
    //     case 5:
    //         day="Friday";
    //         break;
    //     case 6:
    //         day="Saturday";
    //         break;
    //     default:
    //         break;
    // }
    //
    // Now using the predefined function 
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    let day = today.toLocaleDateString("en-US", options);
    Item.find({}, function (err, items) {
        res.render("list", {
            KindOfDay: day,

            newListItem: items
        });
    });
});

app.post("/", function (req, res) {
    let item = req.body.newItem;
    Item.insertMany([{ name: item }])
    res.redirect("/");
});
app.post("/delete", function (req, res) {
    let item = req.body.checkbox;
    Item.findByIdAndRemove(item, function (err) {})
    res.redirect("/");
});
app.listen(3000, function () {
    console.log("Server started on port 3000.");
}); 