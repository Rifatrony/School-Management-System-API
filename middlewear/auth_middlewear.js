const  jwt = require("jsonwebtoken")

const checkLogin = (req, res, next)=>{
    const {authorization} = req.headers;
    try {
        const token  = authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const {phone, id, exp } = decode;
        req.phone = phone;
        req.id = id;

        if (Date.now() >= exp * 1000) {
            return res.status(401).json({ message: 'Token has expired' });
        }
        else{
            next();
        }

    } catch (error) {
        res.status(404).json({
            "message": "Authentication Failed"
        })
        next();
    }
}

module.exports = checkLogin;

