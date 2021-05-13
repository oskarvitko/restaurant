const {Router, request, response} = require('express')
const Order = require('../models/Order')
const config = require('config')
const router = Router()

router.get('/', async (request, response) => {
    try {
        const orders = await Order.getAll()
        response.status(200).json(orders)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/:id', async (request, response) => {
    try {
        const id = request.params.id
        const order = await Order.getById(Number(id))
        response.status(200).json(order)
    } catch (e) {
        console.log(e);
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/getdishes:id', async (request, response) => {
    try {
        const id = request.params.id
        const dishes = await Order.getDishes(Number(id))
        response.status(200).json(dishes)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/addorder', async (request, response) => {
    try {
        const {sum, dishes, reservationId} = request.body
        await Order.add(Number(sum))
        const order = await Order.getLast()

        const saveDishs = async () => {
            dishes.forEach(dish => {
                Order.addDishsOrders(order[0].Order_ID, dish.id, dish.count)
            })
        }
        await Order.updateReservation(reservationId, order.Order_ID)
        await saveDishs()
        response.status(200).json({ message: 'Заказ успешно добавлен' })
    } catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router