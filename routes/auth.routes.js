const {Router} = require('express')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('login', 'Минимальная длина имени 4 символа').isLength({ min: 4 }),
        check('password', 'Минимальная длина пароля 4 символов').isLength({ min: 4 })
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const {login, password} = request.body

            const exists = await User.exists(login)
            if (exists) {
                return response.status(400).json({ message: 'Пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            await User.add(login, hashedPassword)

            response.status(201).json({ message: 'Пользователь успешно создан' })

        } catch (e) {
            response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.post(
    '/login',
    [
        check('login', 'Некорректное имя').isLength({ min: 4 }),
        check('password', 'Введите пароль').exists()
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе'
                })
            }

            const {login, password} = request.body


            const user = await User.getByLogin(login)
            if (!user) {
                return response.status(400).json({ message: 'Такого пользователя не существует' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return response.status(400).json({ message: 'Неверные данные, попробуйте снова' })
            }

            const token = jwt.sign(
                { userId: user.user_ID },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            response.json({ token, userId: user.user_ID, message: 'Вход выполнен успешно' })

        } catch (e) {
            response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

module.exports = router