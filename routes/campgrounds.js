var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/", function(req, res){
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
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

//CREATE - add campground to database
router.post("/", function(req, res){
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
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
