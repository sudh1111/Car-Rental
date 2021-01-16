var express=require("express"),
    app=express(),
	mongoose=require("mongoose"),
	bodyParser=require("body-parser"),
	show_available_cars=require("./controller/show_available_cars.js"),
	Book_specific_car=require("./controller/bookSpecific.js"),
	updatecar=require("./controller/updatecar.js"),
	deletecar=require("./controller/deletecar.js"),
	show_cars_by_model=require("./controller/show_car_by_model.js"),
	addcar=require("./controller/addcar.js"),
	User = require("./models/user.js"),
	passport    = require("passport"),
	indexRoutes=require("./controller/logCheck.js"),
    LocalStrategy = require("passport-local");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const uri="mongodb+srv://akhil-sharma25:Akhil123%23@cluster0-yxoxf.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{console.log('DB Connected')}).catch((err)=>{console.log(err)});
///passport authentication
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});
////////////
app.use(indexRoutes);
app.use( addcar);
app.use(show_available_cars);
app.use(updatecar);
app.use(show_cars_by_model);
app.use( deletecar);
app.use(Book_specific_car);
app.listen(process.env.PORT||3000, process.env.IP, function(){
   console.log("Server Has Started!!");
});