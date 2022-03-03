const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

exports.verify = async (req, res, next) => {

    const publicKey = `-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1pAlLvxR88HsbIOIuA7mLlUYneZHVPRwNlNQancPgYquwWs3zCQrjlEiJNYQQfZUN6G7vSWZSF08FXuS29q+oqR6HWjGze4aBxDmm0a1cBh04IeCKQRPn2T8xl30e3zrL72HvpbcUPkyh5RN951LWp9eFwgGWyaN1vf6hptF4cWiQZ6AjrfO5A010/S5Ntjy3jHo46jOAUZLSKe/eyevQZR/a/AGsn9t6UTpGlxz0TBmHcK4n6nbFpmYNhlh3f45ALEJU5v8BJg4bjvi66snyhFVN2522WnCwF51hAUThiQgA5SrkdL6pNvVhmlXjHRvbZ+eucVFC/94yZ6+5qyGW+6dB4xRW5+sz3Hy7fyCq/TGjOilbvh+87VlyPbijd8j5Au3wPTFAxVkPBIhyCpuI+hOuyM655vDLJ6KPXVPMx+63eC0T+T4geXCJbSyJE6u3VJUPOKzuuA4naX46VnRUZUtP+wGrPrgsMQQePJoM3mssqtRkW/DCUk4A0o4Q+bKPpMKJ+BUYB8yyKbTT0Oip2qK+9MAOHEre3qlILOFyknKJxROCni83eBMgZuLxbwrZlABNqVPDnTDTRDiB52ib2VbRNjGA7j2+M1FLwJl1TujTz+cE5SVJFunkZ96WS33EzLQDZmGTNfHG0gDEpCUHxoSavcZQtaWFrIbxKPHOt8CAwEAAQ==\n-----END PUBLIC KEY-----\n`
    const accessToken = req.headers.authorization.split(" ")[1]
    
    if(!accessToken) res.status(403).json({ error: "please provide a token" })
    else {
        const verifiedPayload = jwt.verify(accessToken, publicKey, {
            algorithms: ["RS256"]
        }, (err, value) => {
            if(err) res.status(500).json({error: "failed to authenticate token"})
            req.user = value.userUuid
            next()
        })
    }

    // const token = req.headers.cookie.split(" ")[0]
    // if(!token) res.status(403).json({ error: "please provide a token" })
    // else {
    //     try {
    //         jwt.verify(token.split("=")[1].replace(";",""), process.env.TOKEN_SECRET, (err, value) => {
    //             if(err) res.status(500).json({error: "failed to authenticate token"})
    //             req.user = value.data
    //             next()
    //          })
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }
}