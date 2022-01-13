const { getBills, createBill, updateBill, deleteBill } = require('./controllers/Bill')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('This is the Bills API')
})

router.get('/bills', getBills)

router.post('/bills', createBill)

router.put('/bills/:billID', updateBill)

router.delete('/bills/:billID', deleteBill)

module.exports = router