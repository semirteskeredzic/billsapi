const Bill = require('../Model/Bill')

const getBills = (req, res) => {
    Bill.find((err, bills) => {
        if(err) {
            res.send(err)
        }
        res.json(bills)
    })
}

const createBill = (req, res) => {
    const bill = new Bill({
        name: req.body.name,
        month: req.body.month,
        year: req.body.year,
        arrival: req.body.arrival,
        amount: req.body.amount,
        utilityCompany: req.body.utilityCompany,
        user: req.body.user,
        previousDebt: req.body.previousDebt
    })

    bill.save((err, bill) => {
        if(err) {
            res.send(err)
        }
        res.json(bill)
    })
}

const updateBill = (req, res) => {
    Bill.findOneAndUpdate(
        { _id: req.params.billID },
        {
            $set: req.body,
        },
        {new: true},
        (err, Bill) => {
            if(err) {
                res.send(err)
            } else res.json(Bill)
        }
    )}

const payBill = (req, res) => {
    Bill.findOneAndUpdate(
        { _id: req.params.billID },
        {
            $set: req.body
        },
        { new: true },
        (err, Bill) => {
            if(err) {
                res.send(err)
            } else res.json(Bill)
        }
    )
}

const deleteBill = (req, res) => {
    Bill.findOneAndDelete(
        { _id: req.params.billID }
    ).then(() => res.json({ message: 'Bill deleted' }))
    .catch((err) => res.send(err))
}

module.exports = {
    getBills,
    createBill,
    updateBill,
    payBill,
    deleteBill
}