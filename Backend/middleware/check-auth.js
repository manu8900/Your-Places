const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        /*Below we are accessing token from header property of a 
        request & we use split coz headers.authorization looks like 
        this->Authorization:'Bearer token' so to get token we first 
        split & access the first element. */
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new Error('Authentication Failed');
        }
    /*when we use jwt.verify to verify token we get string or object 
    assigned as payload when we used jwt.sign to create a token .*/
    const decodedToken = jwt.verify(token,'supersecret_dont_share');
    req.userData = {userId:decodedToken.userId};//Adding data to req.
    next();//to continue to next middleware.
    } catch (err) {
        const error = new HttpError(
            'Authentication Failed',
            401
        );
        return next(error);
    }

}