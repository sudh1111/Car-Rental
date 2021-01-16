var express=require("express"),
    router=express.Router(),
    Car=require("../models/carDetails.js"),
	middleware = require("../middleware"),
	Book=require("../models/bookingDetails.js");
router.post("/bookSpecific",middleware.authentication,function(req,res){
	var customer_name=req.body.customer_name,
		customer_phone=req.body.customer_phone,
		issueDate=req.body.issueDate,
		returnDate=req.body.returnDate,
		vehicleno=req.body.vehicleno;
	var customer={customer_name:customer_name,customer_phone:customer_phone,issueDate:issueDate,returnDate:returnDate,car_booked:null};
			Book.find({car_booked:vehicleno},function(err,booking){
				if(err)
				{
					res.send(err);
				}
				else
				{
					if(booking.length===0)
					{
						customer.car_booked=vehicleno;
						Car.findOne({vehicleno:vehicleno},function(err,car){
							car.isBooked=true;
							car.save();
						});
						Book.create(customer,function(err,seat){
							if(err)
							{
								res.send(err);
							}
							else
							{
								res.send(customer);
							}
						});
					}
					else
					{
						Book.find(
							{
								
								$or:[
									{$and:[{issueDate:{$lte:customer.issueDate}},
											{returnDate:{$gte:customer.returnDate}}]},
									{$and:[{issueDate:{$lte:customer.returnDate}},
										   {returnDate:{$gte:customer.returnDate}}]},
									{$and:[{issueDate:{$lte:customer.issueDate}},
										   {returnDate:{$gte:customer.issueDate}}]}
								],car_booked:vehicleno
						
							},function(err,found){
							if(err)
							{
								res.send(err);
							}
							else
							{
								console.log(found);
								if(found.length===0)
								{
									customer.car_booked=vehicleno;
									Book.create(customer,function(err,seat){
										if(err)
										{
											res.send(err);
										}
										else
										{
											res.send(customer);
										}
									});
								}
								else
								{
									
									res.send("Booking not possible!!!")
								}
							}
						});
					}
				}
			});
 });
module.exports = router;