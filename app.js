//===============================BASIC SETUP====================================
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds");
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    Comment = require("./models/comment"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    User = require("./models/user")

//requiring routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");

// mongoose.connect("mongodb://localhost/yepo", {useMongoClient: true});
mongoose.connect("mongodb://zirui:910504@ds163806.mlab.com:63806/yepo");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB(); //seed the database

// app.listen(3000,function(){
//     console.log("Yepo started");
// });

//===========================PASSPORT CONFIGURATION=============================

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog",
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//================================ROUTINGS======================================

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP);
