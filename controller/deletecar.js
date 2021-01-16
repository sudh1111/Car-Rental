var express=require("express"),
    router=express.Router(),
    Car=require("../models/carDetails.js"),
	middleware = require("../middleware"),
	Book=require("../models/bookingDetails.js");
router.delete("/deletecar",middleware.authentication,function(req,res){
	var vehicleno=req.body.vehicleno;
	Car.findOne({vehicleno:vehicleno},function(err,car){
		Book.find({car_booked:vehicleno},function(err,vehicle){
			if(vehicle.length===0)
			{
					car.remove();
					res.send("Car Deleted!!");
			}
			else
			{
				res.send("Car cannot be deleted as booked!!");
			}
		});
	});
});
module.exports = router;