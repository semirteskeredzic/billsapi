const { getBills, createBill, updateBill, deleteBill, getUnpaidBills, payBill, getPaidBills, getDueBills, getPaidBillsTotal } = require('./controllers/Bill')
const { loginUser, registerUser, getUser, logOutUser } = require('./controllers/User')
const middleware = require('./middleware')

const router = require('express').Router()

router.get('/', middleware.verify,  (req, res) => {
    res.send('This is the Bills API')
})

router.get('/bills', middleware.verify, getBills)

router.get('/unpaidbills', middleware.verify, getUnpaidBills)

router.get('/duebills', middleware.verify, getDueBills)

router.get('/paidbillstotal', middleware.verify, getPaidBillsTotal)

router.get('/paidbills', middleware.verify, getPaidBills)

router.post('/bills', middleware.verify, createBill)

router.put('/bills/:billID', middleware.verify, updateBill)

router.put('/bills/:billD', middleware.verify, payBill)

router.delete('/bills/:billID', middleware.verify, deleteBill)

router.post('/login', loginUser)

router.post('/register', registerUser)

router.post('/logout', logOutUser)

router.get('/user/:userID', middleware.verify, getUser)

module.exports = router