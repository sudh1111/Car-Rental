const mongoose =require('mongoose')
var newSchema=new mongoose.Schema({
		vehicleno:{
		type:String,
		required:true,
		},
		model:{
		type:String,
		required:true,
		},
		seatingcap:{
		type:Number,
		required:true,
		},
		rent_day:{
		type:Number,
		required:true,
		},
		isBooked:{
			type:Boolean,
			required:true,
		}
});



/*
const Car = new Car({
vehicleno : 'HR12AS8787',
model:'2015S',
seatingcap:5,
rent_day:80,
Bookings:[
{"Akhil",4545454545,'2020-05-24','2020-05-28'}],
isBooked:True
})
*/
module.exports = mongoose.model("Car",newSchema);