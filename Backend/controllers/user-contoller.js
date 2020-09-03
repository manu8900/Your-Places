const HttpError = require('../models/http-error');
//BcryptJs Library is for hashing & encrypting text.
const bcrypt = require('bcryptjs');
//For Generating Jwt webtoken.
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const User = require('../models/user');


const getUsers = async (req, res, next) => {
    let users;
    try {
        /* -password will exclude password & return all 
        other data from user model */
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed please try again later.',
            500
        );
        return next(error);
    }
    /* find returns an array that's why used map before converting to obj */
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
}

const signup = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(
            new HttpError('Entered invalid inputs', 422)
        )

    }
    const { name, email, password } = req.body;
    let existingUser;
    /* findOne method simply find one document matching the criteria*/
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Signing Up failed please try again later',
            500
        )
        return next(error);
    }
    if (existingUser) {
        const error = new HttpError(
            'User exist already,please login instead',
            422
        );
        return next(error);
    }
    let hashedPassword;
    try {/*hash method contains value to hash & salt ie.strength of 
        hash,salt value of 12 creates a strong hash value.*/
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
            'Could not create user,please try again ',
            500
        );
        return next(error);
    }
    const createdUser = new User({
        name,
        email,
        image: req.file.path,
        password: hashedPassword,//hashed password
        places: []
    });
    try {
        await createdUser.save();//Saved data in database
    } catch (err) {
        const error = new HttpError(
            'Signing Up failed,please try again',
            500
        );
        return next(error);
    }

    let token;
    try{
        token = jwt.sign(
            {   //payload or data.
                userId: createdUser.id, email: createdUser.email
            }, //privatekey which is a string.
            'supersecret_dont_share',
            {   //duration of token.
                expiresIn: '1h'
            }
        );
    }catch(err){
        const error = new HttpError(
            'Signing Up failed,please try again',
            500
        );
        return next(error);
    }
   
    res.status(201).json({ 
        userId:createdUser.id,
        email:createdUser.email,
        token:token 
    });

    // res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    /* findOne method simply find one document matching the criteria*/
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Logging in failed please try again later',
            500
        )
        return next(error);
    }
    if (!existingUser) {
        const error = new HttpError(
            'Invalid Credentials entered,could not log you in.',
            401
        )
        return next(error);
    }

    let isValidPassword = false;
    try {//Comparing hashed password in database with text password. 
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
            'Could not log you in,Check your credentials & try again.',
            500
        );
        return next(error);
    }
    if (!isValidPassword) {
        const error = new HttpError(
            'Invalid Credentials entered,could not log you in.',
            401
        )
        return next(error);
    }

    let token;
    try{
        token = jwt.sign(
            {   //payload or data.
                userId: existingUser.id, email: existingUser.email
            }, //privatekey which is a string.
            'supersecret_dont_share',
            {   //duration of token.
                expiresIn: '1h'
            }
        );
    }catch(err){
        const error = new HttpError(
            'Logging In failed,please try again',
            500
        );
        return next(error);
    }
    res.status(200).json(
        {
            userId:existingUser.id,
            email:existingUser.email,
            token:token
        }
    );
    // res.status(200).json(
    //     {
    //         message: 'Login Succesful!',
    //         user: existingUser.toObject({ getters: true })
    //     }
    // );
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;