var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud Rest",
        image: "http://www.campgroundsoregon.com/system/images/Campgrounds%20Oregon%208-5-2013%20108.JPG",
        description: "blah blah blab",
    },
    {
        name: "Deseart Nasa",
        image: "http://www.waterwinterwonderland.com/images/camping/large/state_park_campground.jpg",
        description: "blah blah blab",
    },
    {
        name: "Canyon Floor",
        image: "http://www.campjellystone.com/wp/wp-content/uploads/2012/08/PennsylvaniaCampgrounds1.jpg",
        description: "blah blah blab",
    },
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err) {
        if(err){
            console.log(err);
        }else{
            console.log("removed campgrounds!");
            //add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("added a campgrounds.");
                        //add a few comments
                        Comment.create(
                            {
                                text: "This place is greate, but I wish there was Internet.",
                                author: "Homer",
                            }, function(err, comment) {
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created a campground");
                                }
                            }
                        )
                    }
                });

            })
        }
    })

}

module.exports = seedDB;
