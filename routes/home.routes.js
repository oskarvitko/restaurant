const {Router} = require('express')
const Reservation = require('../models/Reservation')
const config = require('config')
const router = Router()

router.get('/', async (request, response) => {
    try {
        const currentDate = new Date()
        const stringDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
        const reservations = await Reservation.getAllOnDate(stringDate)
        response.status(200).json(reservations)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router
