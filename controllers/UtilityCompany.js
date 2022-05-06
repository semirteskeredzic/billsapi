const UtilityCompany = require('../Model/UtilityCompany')

const getUtilityCompanies = (req, res) => {
    UtilityCompany.find({}, (err, companies) => {
        if(err) {
            res.send(err)
        }
        res.json(companies)
    })
}

const createUtilityCompany = (req, res) => {
    const utilityCompany = new UtilityCompany({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website,
        createdAt: Date.now()
    })
    utilityCompany.save((err, utilityCompany) => {
        if(err) {
            res.send(err)
        }
        res.json(utilityCompany)
    })
}

const updateUtilityCompany = (req, res) => {
    UtilityCompany.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true}, (err, utilityCompany) => {
        if(err) {
            res.send(err)
        }
        res.json(utilityCompany)
    }
)}

const deleteUtilityCompany = (req, res) => {
    UtilityCompany.findByIdAndDelete(req.params.id, (err, utilityCompany) => {
        if(err) {
            res.send(err)
        }
        res.json(utilityCompany)
    }).catch(err => res.send(err))}

module.exports = {
    getUtilityCompanies,
    createUtilityCompany,
    updateUtilityCompany,
    deleteUtilityCompany
}