const {Router} = require('express')
const Link = require('../models/link')
const router = Router()

router.get('/:code', async (req, res) => {
	try {
		const link = await Link.findOne({code: req.params.code})

		if (link) {
			link.clicks++
			link.save()

			return res.redirect(link.from)
		}

		res.status(404).json({message: 'Посилання не знайдено'})
	} catch (e) {
		res.status(500).json({message: 'Щось пішло не так, попробуйте заново пізніше'})
	}
})

module.exports = router
