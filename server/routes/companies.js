const { SQL } = require('../dbconfig')

const router = require('express').Router()


router.get('/', async(req, res) => {
    try {
        const companies = await SQL(`
        SELECT *
        FROM companies;
        `)
        console.table(companies) //showing nice table at the terminal
        res.send(companies)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)

    }
})


module.exports = router