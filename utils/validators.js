const {body} = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.registerValidator = [
	body('email')
		.not().isEmpty().withMessage('Введіть, будь ласка, E-mail')
		.isEmail().withMessage('Введіть коректний E-mail')
		.custom(async (value) => {
			const candidate = await User.findOne({email: value})

			if (candidate) {
				return Promise.reject('Такий користувач вже зареєстрований')
			}
		})
		.normalizeEmail()
		.trim(),
	body('name')
		.not().isEmpty().withMessage(`Введіть своє ім'я`)
		.isLength({min: 2}).withMessage('Мінімальна довжина імені - 2 символи')
		.trim(),
	body('password')
		.isLength({min: 8}).withMessage('Мінімальна довжина паролю - 8 символів')
		.isAlphanumeric()
		.trim(),
	body('confirm')
		.custom((value, {req}) => {
			if (value !== req.body.password) {
				throw new Error('Паролі не співпадають')
			}

			return true
		})
]

exports.loginValidator = [
	body('email')
		.not().isEmpty().withMessage('Введіть, будь ласка, E-mail')
		.isEmail().withMessage('Введіть коректний E-mail')
		.custom(async (value) => {
			const candidate = await User.findOne({email: value})

			if (!candidate) {
				return Promise.reject('Користувач з таким E-mail не зареєстрований')
			}
		})
		.normalizeEmail()
		.trim(),
	body('password')
		.isLength({min: 8}).withMessage('Мінімальна довжина паролю - 8 символів')
		.custom(async (value, {req}) => {
			const candidate = await User.findOne({email: req.body.email})

			const isSame = await bcrypt.compare(value, candidate.password)

			if (!isSame) {
				return Promise.reject('Невірний пароль')
			}
		})
		.isAlphanumeric()
		.trim()
]
