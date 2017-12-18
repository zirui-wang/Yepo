var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salman Creek", image:"https://www.washingtonian.com/wp-content/uploads/2016/06/dc-area-camping-savage-river-lodge-maryland-yurts_featured.jpg"},
    {name: "Grantie Hill", image:"https://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=cQMlidOg"},
    {name: "Mountain Goats Rest", image:"http://www.jejuweekly.com/news/photo/201309/3470_5530_3517.jpg"},
    {name: "Salman Creek", image:"https://www.washingtonian.com/wp-content/uploads/2016/06/dc-area-camping-savage-river-lodge-maryland-yurts_featured.jpg"},
    {name: "Grantie Hill", image:"https://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=cQMlidOg"},
    {name: "Mountain Goats Rest", image:"http://www.jejuweekly.com/news/photo/201309/3470_5530_3517.jpg"},
];

app.listen(3000,function(){
    console.log("Yepo started");
});

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})
