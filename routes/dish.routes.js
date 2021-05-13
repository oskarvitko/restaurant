const {Router} = require('express')
const Dish = require('../models/Dish')
const config = require('config')
const router = Router()

router.get('/all', async (request, response) => {
    try {
        const dishes = await Dish.getAll({ order: "Dish_ID" })
        response.status(200).json(dishes)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/top', async (request, response) => {
    try {
        const dishes = await Dish.getTop()
        response.status(200).json(dishes)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/price', async (request, response) => {
    try {
        const dishes = await Dish.getAll({ order: "Price DESC" })
        response.status(200).json(dishes)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/name', async (request, response) => {
    try {
        const dishes = await Dish.getAll({ order: "Name" })
        response.status(200).json(dishes)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/weight', async (request, response) => {
    try {
        const dishes = await Dish.getAll({ order: "Weight DESC" })
        response.status(200).json(dishes)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/search', async (request, response) => {
    try {
        const {searchField} = request.body
        const dishes = await Dish.getByName(searchField)
        response.status(200).json(dishes)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/add', async (request, response) => {
    try {
        const {name, price, weight} = request.body
        await Dish.add(name, Number(price), Number(weight))
        response.status(200).json({ message: 'Блюдо успешно добавлено' })
    } catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/delete:id', async (request, response) => {
    try {
        const id = request.params.id
        await Dish.delete(id)
        response.status(200).json({ message: 'Блюдо удалено' })
    } catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
module.exports = router