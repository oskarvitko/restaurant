const {Router, request, response} = require('express')
const Reservation = require('../models/Reservation')
const config = require('config')
const router = Router()

router.get('/all', async (request, response) => {
    try {
        const reservations = await Reservation.getAll()
        response.status(200).json(reservations)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/active', async (request, response) => {
    try {
        const reservations = await Reservation.getActive()
        response.status(200).json(reservations)
    } catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/date', async (request, response) => {
    try {
        const {date} = request.body
        const reservations = await Reservation.getAllOnDate(date)
        console.log(date);
        response.status(200).json(reservations)
    } catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/personondate', async (request, response) => {
    try {
        const date = request.body
        const count = await Reservation.getPersonsOnDate(date)
        response.status(200).json(count)
    } catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/add', async (request, response) => {
    try {
        const {reservation, client, tableId} = request.body
        await Reservation.add(reservation, client, tableId)
        response.status(200).json({ message: 'Бронь успешно добавлена' })
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/close:id', async (request, response) => {
    try {
        const id = request.params.id
        await Reservation.close(id)
        response.status(200).json({ message: 'Бронь успешно закрыта' })
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/order', async (request, response) => {
    try {
        const reservations = await Reservation.getWithoutOrder()
        response.status(200).json(reservations)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router