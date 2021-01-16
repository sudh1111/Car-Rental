var express=require("express"),
    router=express.Router(),
    Car=require("../models/carDetails.js"),
	middleware = require("../middleware"),
	Book=require("../models/bookingDetails.js");
	router.put("/updatecar",middleware.authentication,function(req,res){
	var vehicleno=req.body.vehicleno,
		key=req.body.key,
		key_val=req.body.key_val;
		Car.findOne({vehicleno:vehicleno},function(err,car){
			if(err)
			{
				res.send(err);		
			}
			else
			{
				Book.find({car_booked:vehicleno},function(err,vehicle){
					if(err)
					{
						res.send(err);
					}
					else
					{
						if(vehicle.length===0)
						{
							Car.updateMany({"vehicleno":vehicleno}, {$set:{[key]:key_val}},function(err,car){
							if(err)
							{
								res.send(err);	
							}
							else
							{
								//doc.save();
								console.log(car);
								//res.send(car);
							}
							});
							Car.find({vehicleno:vehicleno},function(err,car){
								if(err)
								{
									res.send(err);		
								}
								else
								{
									res.send(car);
								}
								});
					}
							else
							{
								res.send("Cannot be updated as it is booked!!");
							}
					}
				});
			}
		});
});
module.exports = router;