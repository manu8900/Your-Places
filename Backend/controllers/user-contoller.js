const uuid = require('uuid/v4');
const HttpError = require('../models/http-error')
const { validationResult } = require('express-validator')
const User = require('../models/user');


const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Manu George',
        email: 'test@test.com',
        password: 'testers'
    }
]

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(
            new HttpError('Entered invalid inputs', 422)
        )

    }
    const { name, email, password, places } = req.body;
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
    const createdUser = new User({
        name,
        email,
        image: 'https://image.flaticon.com/icons/png/512/219/219970.png',
        password,
        places
    });
    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing Up failed,please try again',
            500
        );
        return next(error);
    }
    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not find the user,Enter Valid Credentials', 401);
    }
    res.status(200).json({ message: 'Login Succesful!' });
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;