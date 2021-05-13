const {Router} = require('express')
const Waiter = require('../models/Waiter')
const config = require('config')
const router = Router()

router.get('/', async (request, response) => {
    try {
        const waiters = await Waiter.getAll()
        response.status(200).json(waiters)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/', async (request, response) => {
    try {
        const {searchField} = request.body
        const waiters = await Waiter.getByName(searchField)
        response.status(200).json(waiters)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/add', async (request, response) => {
    try {
        const {name, phone} = request.body
        await Waiter.add(name, phone)
        response.status(200).json({ message: 'Официант успешно добавлен' })
    } catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/delete:id', async (request, response) => {
    try {
        const id = request.params.id
        await Waiter.delete(id)
        response.status(200).json({ message: 'Официант удалён' })
    } catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router