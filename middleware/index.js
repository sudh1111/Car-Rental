var middlewareObj={};
middlewareObj.authentication = function(req, res, next){
	 if(req.isAuthenticated()){
		 return next();
	 }
	else
	{
		res.send("Signup/Login First!!!");
	}
}
module.exports = middlewareObj;