var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user.js");
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            res.sen(err);
        }
        passport.authenticate("local")(req, res, function(){
           res.send("Successfully Registered, you may continue!!"); 
        });
    });
});

router.post("/login", passport.authenticate("local"), function(req, res){
	res.send("Login Successfully!!");
});
router.get("/logout", function(req, res){
   req.logout();
   res.send("Logout Done!!");
});
module.exports = router;