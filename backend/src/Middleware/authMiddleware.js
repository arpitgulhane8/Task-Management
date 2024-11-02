const jwt = require('jsonwebtoken');
const User = require('../model/User');

const authMiddleware = async(req,res,next) => {
    try{
        const authHeader = req.header('Authorization');  
        const token = authHeader && authHeader.split(' ')[1]; 
    if(token){

        const verified = jwt.verify(token,process.env.TOKEN_SECRET);

        if(verified){
            const user = await User.findOne({_id:verified._id});
            if(user){
                req.user = user;
                next();
            }
            else{
                res.status(401).send("Access Denied")
            }
        }
        else{
            res.status(401).send("Access Denied")
        }
    }
    else{
        res.status(401).send("Access Denied");
    }
    }
    catch(err){
      next(err);
    }
}

module.exports = authMiddleware;