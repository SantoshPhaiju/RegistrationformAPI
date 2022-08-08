const jwt = require("jsonwebtoken");
const jwt_secret = process.env.jwt_secret;

const fetchuser = async (req, res, next) =>{
    const token = req.header("auth-token");
    if(!token){
        res.status(400).send({error: "Please try to authenticate with valid token"});
    }
    try {
        const data = jwt.verify(token, jwt_secret);
        req.user = data;
        next();
    } catch (error) {
        res.status(500).send({error: "Please try to authenticate with valid token"});
        console.log(error);
    }
}

module.exports = fetchuser;