var express=require("express"),
    router=express.Router(),
    Car=require("../models/carDetails.js"),
    middleware = require("../middleware");
router.post("/addcar",middleware.authentication,function(req,res){
	var model=req.body.model,
		
		vehicleno=req.body.vehicleno,
		
		seatingcap=req.body.seatingcap,
		
		rent_day=req.body.rent_day;
	
	const car= {model:model,vehicleno:vehicleno,seatingcap:seatingcap,rent_day:rent_day,isBooked:false};
	Car.create(car,function(err,car){
		if(err)
		{
			console.log(err);
			res.send(err);
		}
		else
		{
			console.log(car);
			res.send(car);
		}
	});
});
module.exports = router;