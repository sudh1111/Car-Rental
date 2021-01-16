var express=require("express"),
    router=express.Router(),
    Car=require("../models/carDetails.js"),
	middleware = require("../middleware"),
	Book=require("../models/bookingDetails.js");
router.get("/show_available_cars",middleware.authentication,function(req,res){
	var customer_name=req.body.customer_name,
		customer_phone=req.body.customer_phone,
		issueDate=req.body.issueDate,
		returnDate=req.body.returnDate,
		seating_cap=req.body.seating_cap,
		pickupTime=req.body.pickupTime,
		customer=	{
			car_no:null,
			customer_name:customer_name,
			customer_phone:customer_phone,
			issueDate:issueDate,
			returnDate:returnDate,
			seating_cap:seating_cap,
			pickupTime:null};
		var showcars=[];
		Car.find({isBooked:false,seatingcap:seating_cap},function(err,available){
			if(err)
			{
				res.send(err);
			}
			else
			{
					showcars.push(available);
				Book.find({
					$or:[
							{$and:[{issueDate:{$lte:customer.issueDate}},
									{returnDate:{$gte:customer.returnDate}}]},
							{$and:[{issueDate:{$lte:customer.returnDate}},
									{returnDate:{$gte:customer.returnDate}}]},
							{$and:[{issueDate:{$lte:customer.issueDate}},
									{returnDate:{$gte:customer.issueDate}}]}
								]
							},function(err,found){
							if(err)
							{
								res.send(err);
							}
							else
							{
								if(found.lenth===0)
								{
									res.send(showcars);
								}
								else
								{
									var c=[];
									for(i=0;i<found.length;i++)
									{
										c.push(found.car_booked);
									}
									Car.find({car_booked:{$nin:c},isBooked:true,seatingcap:seating_cap},function(err,final){
										if(err)
										{
											res.send(err);
										}
										else
										{
											showcars.push(final);
											res.send(showcars);
										}
									});
								}
							}
			});
			}
		});
});
module.exports = router;