const User = require('../Model/User')
const bcrypt = require('bcrypt')
const rounds = 10
const dotenv = require('dotenv')
const cookie = require('cookie')

dotenv.config()

const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET

const generateToken = (user) => {
    return jwt.sign(
        { data:user },
        tokenSecret,
        { expiresIn: 604800}
    )
}

const updateUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userID},
        {
            $set: req.body
        },
        {new: true},
        (err, User) => {
            if(err) {
                res.send(err)
            } else res.json(User)
        }
    )
}

const deleteUser = (req, res) => {
    User.findOneAndDelete(
        { _id: req.params.userID}
    ).then(() => res.json({message: 'User deleted'}))
    .catch((err) => res.send(err))
}

const loginUser = async(req, res) => {
    const body = req.body
    const user = await User.findOne({ email: body.email })
        if(user) {
        const token = generateToken(user)
        const userObject = {
            userId: user._id,
            userEmail: user.email,
            userRole: user.role
        }
        const validPassword = await bcrypt.compare(body.password, user.password)
        if(validPassword) {
            res.set('Access-Control-Allow-Origin', req.headers.origin);
            res.set('Access-Control-Allow-Credentials', 'true');
            res.set(
                'Access-Control-Expose-Headers',
                'date, etag, access-control-allow-origin, access-control-allow-credentials'
            )
            res.cookie('auth-token', token, {
            httpOnly: true,
            origin: `${process.env.FRONTEND_URL}`,
            })
            res.status(200).json(userObject)
        } else {
            res.status(400).json({ error: "Invalid password" })
        }
    } else {
        res.status(401).json({ error: "User doesn't exist" })
    }
}

const logOutUser = async(req, res) => {
    res.clearCookie('auth-token')
    res.clearCookie('user')
    res.end()
}

const registerUser = async(req, res) => {
    const body = req.body
    console.log('body',body)
    console.log('req',req)

    if(!(body.email && body.password)) {
        return res.status(400).send({
            error: "Data not formatted properly"
        })
    }

    const user = new User(body)

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

   user.save().then(
       res.status(201).send(
           {token: generateToken(user)}
        )
    )
}

const getUser = (req, res) => {
    User.findOne(
        { _id: req.params.userID },
        (err, User) => {
            if(err) {
                res.send(err)
            } else res.json(User._id)
        }
    )
}

module.exports = {
    updateUser,
    deleteUser,
    loginUser,
    registerUser,
    getUser,
    logOutUser
}