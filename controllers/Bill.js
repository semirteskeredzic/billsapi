const Bill = require('../Model/Bill')
const { ObjectId } = require('mongodb');

const getBills = (req, res) => {
    Bill.find({user: req.user}, (err, bills) => {
        if(err) {
            res.send(err)
        }
        res.json(bills)
    })
}

const getUnpaidBills = (req, res) => {
    Bill.find({paid: false, user: req.user }, (err,bills) => {
        if(err) {
            res.send(err)
        }
        const sorted = bills.sort((a,b) => b.month - a.month)
        const groupByYear = sorted.reduce((group, bill) => {
            const { year } = bill;
            group[year] = group[year] ?? [];
            group[year].push(bill);
            return group;
        }, {})
       // const sortedYear = Object.entries(groupByYear).sort().reverse()
        res.json(groupByYear)
    })
}

const getUnpaidBillsWidget = (req, res) => {
    Bill.find({paid: false, user: req.user}, (err, bills) => {
        if(err) {
            res.send(err)
        } else {
            res.json(bills)
        }
    })
}

const getPaidBills = (req, res) => {
    Bill.find({paid: true, user: req.user}, (err,bills) => {
        if(err) {
            res.send(err)
        }
        const sorted = bills.sort((a,b) => b.month - a.month)
        const groupByYear = sorted.reduce((group, bill) => {
            const { year } = bill;
            group[year] = group[year] ?? [];
            group[year].push(bill);
            return group;
        }, {})
       // const sortedYear = Object.entries(groupByYear).sort().reverse()
        res.json(groupByYear)
    })
}

const getDueBills = (req, res) => {
    Bill.find({paid:false, user: req.user}, (err,bills) => {
        if(err) {
            res.send(err)
        }
        else {
            let result = bills?.map(({amount}) => amount)
            let sum = result.reduce((a,b) => a + b, 0)
            res.json(sum)
        }
    })
}

const getPaidBillsTotal = (req, res) => {
    Bill.find({paid:true, user: req.user}, (err,bills) => {
        if(err) {
            res.send(err)
        } else {
            let result = bills?.map(({amount}) => amount)
            let sum = result.reduce((a,b) => a + b, 0)
            res.json(sum)
        }
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
        user: req.user,
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
        { 
            _id: req.body.billID,
            user: req.user
        },
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
    ).then(res.json({message: 'Bill deleted'}))
    .catch((err) => res.send(err))
}

const getPreviousBillCompare = (req, res) => {
    if(req.query.month == 1) {
        Bill.findOne({
            utilityCompany: req.query.utilityCompany, month: 12, year: req.query.year - 1
        }, (err, bill) => {
            if(err) console.log(err)
            else {
                res.json(bill)
            }
        })
    } else {
        Bill.findOne({
            utilityCompany: req.query.utilityCompany, month: req.query.month - 1, year: req.query.year
        }, (err, bill) => {
            if(err) console.log(err)
            else {
                res.json(bill)
            }
        })
    }    
}

module.exports = {
    getBills,
    getUnpaidBills,
    getUnpaidBillsWidget,
    createBill,
    updateBill,
    getDueBills,
    getPaidBillsTotal,
    payBill,
    deleteBill,
    getPaidBills,
    getPreviousBillCompare
}