
const jwt=require("jsonwebtoken")
require("dotenv").config()


 const authenticate = async ( req ,res,next ) =>{
    try {
      const token = req.headers?.authorization?.split(" ")[1]
      
      if(!token){
        return res.status(401).send({ msg : "login first"})
      }
   
      const decoded = jwt.verify(token , process.env.JWT_SECRET)

      if(!decoded){
        return res.status(401).send({msg : "not authorized"})
      }
      req.body.userId = decoded.userId;
      req.body.name=decoded.name;
      next()
    } catch (error) {
      res.status(401).send({ msg: "Something went wrong please try again authenticate" });
    }
}
module.exports={
    authenticate
}