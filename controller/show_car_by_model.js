var express=require("express"),
    router=express.Router(),
	Book=require("../models/bookingDetails.js"),
	middleware = require("../middleware"),
    Car=require("../models/carDetails.js");
router.get("/show_cars_by_model",middleware.authentication,function(req,res){
	var model=req.body.model;
	Car.findOne({"model":model},function(err,cars){
		if(err)
		{
			res.send(err);
		}
		else
		{
			var c=[];
			if(cars===null)
			{
				res.send("No car of given model");
			}
			else
			{
			var vn=cars.vehicleno;
		 	c.push(cars);
			Book.find({car_booked:vn},function(err,b){
			if(err)
			{
				res.send(err);
			}
			else
			{
				if(b.length!==0)
				{
					c.push(b);
				}
				res.send(c);
			}
			});
			}
		}
	});
});
module.exports = router;