var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds");
    Comment = require("./models/comment"),
    // User = require("./models/user"),

mongoose.connect("mongodb://localhost/yepo", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//Schema Setup

// Campground.create({
//     name: "Grantie Hill",
//     image:"https://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=cQMlidOg",
//     description: "This is a huge grantie hill, no bathrooms, no water."
//     }, function(err, campground){c
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

//=============CAMPGROUNDS ROUTES===============

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // res.render("campgrounds", {campgrounds: campgrounds});
    Campground.find({}, function(err, campgrounds) {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
})

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
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
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

//=============COMMENT ROUTES===============

//NEW
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
})

//CREATE
app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})
