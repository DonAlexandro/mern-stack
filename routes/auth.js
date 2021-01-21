const {Router} = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/user')
const {registerValidator, loginValidator} = require('../utils/validators')

router.post('/register', registerValidator, async (req, res) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array()[0].msg
		})
	}

	try {
		const {email, password, name} = req.body

		const hashedPassword = await bcrypt.hash(password, 12)

		const user = new User({email, password: hashedPassword, name})

		await user.save()

		res.status(201).json({message: 'Ви успішно зареєструвалися!'})
	} catch (e) {
		res.status(500).json({message: 'Щось пішло не так, попробуйте заново пізніше'})
	}
})

router.post('/login', loginValidator, async (req, res) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array()[0].msg
		})
	}

	try {
		const {email} = req.body

		const user = await User.findOne({email})

		const token = jwt.sign({userId: user._id}, config.get('jwtSecret'), {expiresIn: '1h'})

		res.json({token, userId: user._id})
	} catch (e) {
		res.status(500).json({message: 'Щось пішло не так, попробуйте заново пізніше'})
	}
})

module.exports = router
