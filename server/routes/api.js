const { SQL } = require('../dbconfig')

const router = require('express').Router()

// ---הצגת השרתים---
router.get('/servers', async (req, res) => {
    // ---בחיפוש---
    if (req.query.searchTerm) {
        try {
            const sservers = await SQL(`
            SELECT servers.*, companies.companyName as company
            FROM servers
            inner join companies on servers.company_id = companies.companyID
            WHERE servers.serverName LIKE '${req.query.searchTerm}%'
            order by created desc;
            `)
            console.table(sservers) //showing nice table at the terminal
            return res.send(sservers)
        } catch (error) {
            console.log(error);
            return res.sendStatus(500)
        }

    }
    // ---הכל ללא חיפוש----
    try {
        const servers = await SQL(`
        SELECT servers.*, companies.companyName as company
        FROM servers
        inner join companies on servers.company_id = companies.companyID
        order by created desc;
        `)
        console.table(servers) //showing nice table at the terminal
        res.send(servers)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)

    }
})
// --by id
router.get('/servers/:id', async (req, res) => {
    try {
        const servers = await SQL(`
        SELECT servers.*, companies.companyName as company
        FROM servers
        inner join companies on servers.company_id = companies.companyID
        where servers.id = ${req.params.id};
        `)
        console.table(servers) //showing nice table at the terminal
        res.send(servers)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)

    }
})

router.get('/onlyon', async (req, res) => {
    try {
        const onlyon = await SQL(`
        SELECT servers.*, companies.companyName as company
        FROM servers
        inner join companies on servers.company_id = companies.companyID
        WHERE servers.status = 1
        order by created desc;
        `)
        console.table(onlyon) //showing nice table at the terminal
        res.send(onlyon)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)

    }
})
router.post('/servers', async (req, res) => {
    try {
        const { serverName, ip, company_id } = req.body
        if (!serverName || !ip || !company_id) {
            return res.status(400).send({ err: "missing info" })
        }
        await SQL(`INSERT INTO servers (serverName, ip, company_id) VALUES ("${serverName}", "${ip}", ${company_id});`)

        res.send({ msg: "server created" })

    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.put('/onoff/:server_id', async (req, res) => {
    try {
        await SQL(`
         update servers
         set status = ${req.body.ison}
         where id= ${req.params.server_id}
         ;
         `)

        res.send({ msg: "on/off" })

    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.use('/companies', require('./companies'))

module.exports = router