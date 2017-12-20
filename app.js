var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yepo", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
})

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create({
//     name: "Grantie Hill",
//     image:"https://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=cQMlidOg",
//     description: "This is a huge grantie hill, no bathrooms, no water."
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Newly created campground:");
//             console.log(campground);
//         }
//     });

// var campgrounds = [
//     {name: "Salman Creek", image:"https://www.washingtonian.com/wp-content/uploads/2016/06/dc-area-camping-savage-river-lodge-maryland-yurts_featured.jpg"},
//     {name: "Grantie Hill", image:"https://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=cQMlidOg"},
//     {name: "Mountain Goats Rest", image:"http://www.jejuweekly.com/news/photo/201309/3470_5530_3517.jpg"},
//     {name: "Salman Creek", image:"https://www.washingtonian.com/wp-content/uploads/2016/06/dc-area-camping-savage-river-lodge-maryland-yurts_featured.jpg"},
//     {name: "Grantie Hill", image:"https://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=cQMlidOg"},
//     {name: "Mountain Goats Rest", image:"http://www.jejuweekly.com/news/photo/201309/3470_5530_3517.jpg"},
// ];

app.listen(3000,function(){
    console.log("Yepo started");
});

app.get("/", function(req, res){
    res.render("landing");
})

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // res.render("campgrounds", {campgrounds: campgrounds});
    Campground.find({}, function(err, campgrounds) {
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds: campgrounds});
        }
    })
})

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//CREATE - add campground to database
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("")
        }else{
            res.redirect("/campgrounds");
        }
    });
})

//SHOW -
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: foundCampground});
        }
    })
})
