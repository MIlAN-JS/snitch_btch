import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/config.js";

export const checkUser = async (req, res, next) => {

   try {

      // get token from cookies
      const token = req.cookies.token;

      // if token not found
      if (!token) {
         return res.status(401).json({
            message: "Unauthorized access"
         });
      }

      // verify token
      const decoded = jwt.verify(
         token,
         config.JWT_SECRET
      );

      console.log(decoded)

     

  

      // attach userID to request
      req.user = decoded.id;

      // move to next middleware/controller
      next();

   } catch (error) {

      return res.status(401).json({
         message: "Invalid token"
      });

   }

};



export const checkSeller = async(req , res , next)=>{

   try {
  
      const token = req.cookies.token;
       // if token not found
      if (!token) {
         return res.status(401).json({
            message: "Unauthorized access"
         });
      }

      // verify token
      const decoded = jwt.verify(
         token,
         config.JWT_SECRET
      );

      if (decoded.role !== "seller") {
         return res.status(401).json({
            message: "Unauthorized access only seller can create product"
         });
      }

      req.user = decoded.id;

      next();


   } catch (error) {

      return res.status(401).json({
         message: "Invalid token"
      });
      
   }
     

}

