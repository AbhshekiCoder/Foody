import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next){
    const authHeader = req.header("Authorization");
    console.log(authHeader)
    if(!authHeader){
        return res.status(401).send("Access denied. No token provided.");
    }
    
    const token = authHeader.replace("Bearer", "");
  
    if(!token){
        return res.status(401).send("Access denied. No token provided.");
    }
   
    try{
       const decoded = jwt.verify(authHeader.split(" ")[1], '123456');
      console.log(decoded.email)
       req.user = decoded;
       next();

    }catch (error) {
    res.status(400).send("Invalid token.");
    console.log(error.message)
  }
}
export default authenticateToken;