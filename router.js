const { getBills, createBill, updateBill, deleteBill } = require('./controllers/Bill')
const { loginUser, registerUser } = require('./controllers/User')
const middleware = require('./middleware')

const router = require('express').Router()

router.get('/', middleware.verify,  (req, res) => {
    res.send('This is the Bills API')
})

router.get('/bills', middleware.verify, getBills)

router.post('/bills', middleware.verify, createBill)

router.put('/bills/:billID', middleware.verify, updateBill)

router.delete('/bills/:billID', middleware.verify, deleteBill)

router.post('/login', middleware.verify, loginUser)

router.post('/register', middleware.verify, registerUser)

module.exports = router