const express = require('express')
const config = require('config')
const connection = require('./db/connection')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/home', require('./routes/home.routes'))
app.use('/api/tables', require('./routes/tables.routes'))
app.use('/api/reservations', require('./routes/reservations.routes'))
app.use('/api/clients', require('./routes/clients.routes'))
app.use('/api/dishs', require('./routes/dish.routes'))
app.use('/api/waiters', require('./routes/waiters.routes'))
app.use('/api/orders', require('./routes/orders.routes'))

async function start() {
    try {
        await connection.connect()
    } catch (e) {
        console.log('Server error: ', e.message)
        process.exit(1)
    }
}

start()

app.listen(process.env.PORT || 5000, () => console.log(`App has been started...`))