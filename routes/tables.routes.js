const {Router} = require('express')
const Table = require('../models/Table')
const config = require('config')
const router = Router()

router.get('/all', async (request, response) => {
    try {
        const tables = await Table.getAll()
        response.status(200).json(tables)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/free', async (request, response) => {
    try {
        const tables = await Table.getFree()
        response.status(200).json(tables)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/add', async (request, response) => {
    try {
        const {capacity, location} = request.body
        await Table.add(Number(capacity), location)
        response.status(200).json({ message: 'Стол успешно добавлен' })
    } catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/delete:id', async (request, response) => {
    try {
        const id = request.params.id
        await Table.delete(id)
        response.status(200).json({ message: 'Стол удалён' })
    } catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router