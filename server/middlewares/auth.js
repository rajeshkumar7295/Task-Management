const Jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = async (req, res, next) => {
    try {
        const token =  req.header("Authorization").replace("Bearer ", "");
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing."
            })
        }
        try {

            const decode =  Jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid."
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while validating  the token."
        })
    }
}

module.exports=authMiddleware