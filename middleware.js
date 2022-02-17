const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

exports.verify = (req, res, next) => {
    const token = req.headers.cookie.split(" ")[0]
    if(!token) res.status(403).json({ error: "please provide a token" })
    else {
        try {
            jwt.verify(token.split("=")[1].replace(";",""), process.env.TOKEN_SECRET, (err, value) => {
                if(err) res.status(500).json({error: "failed to authenticate token"})
                req.user = value.data
                next()
             })
        } catch(err) {
            console.log(err)
        }
    }
}