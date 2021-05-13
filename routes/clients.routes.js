const {Router} = require('express')
const Client = require('../models/Client')
const config = require('config')
const router = Router()

router.get('/', async (request, response) => {
    try {
        const clients = await Client.getAll()
        response.status(200).json(clients)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/', async (request, response) => {
    try {
        const {searchField} = request.body
        const clients = await Client.getByName(searchField)
        response.status(200).json(clients)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router