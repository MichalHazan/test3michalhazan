const express = require('express')
const cors = require('cors')
const { SQL } = require('./dbconfig')


// --inits

const app = express()
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}

// --middlewares
app.use(express.json())
app.use(cors(corsOptions))


// endpoints
app.get('/', (req, res) => {
    res.send({ msg: "work", docsUrl: "http://localhost:2001/servers" })
})


app.use('/companies', require('./routes/companies'))
app.use('/api', require('./routes/api'))
// --listen
app.listen(2001, () => console.log("rocking2001"))
