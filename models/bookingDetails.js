const mongoose =require('mongoose');
var newSchema=new mongoose.Schema({
		car_booked:String,
		customer_name:String,
		customer_phone:{
		type:Number,
		minlength:10,
		maxlength:10
		},
		issueDate:Date,
		returnDate:Date
});
module.exports = mongoose.model("Book",newSchema);