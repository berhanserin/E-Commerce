const Category = require('../database/models/Category')
const response = require('../response')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const category = await Category.find()
    if (category) {
        return new response(category, null).success(res)
    }
})

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (category) {
        return new response(category, null).success(res)
    }
    return new response(null, { message: 'Notfound' }).notFount(res)
})

router.post('/', async (req, res) => {
    req.body._id = parseInt(await Category.find().count())
    let category = new Category(req.body)
    await category
        .save()
        .then((crerated) => {
            crerated.isDeleted = true
            return new response(crerated, null).created(res)
        })
        .catch((err) => {
            return new response(null, err.errors).error500(res)
        })
})

router.delete('/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
        .then((category) => {
            if (category) {
                return new response(category, null).success(res)
            }

            return new response(null, {
                message: 'Not Found',
            }).notFount(res)
        })
        .catch((err) => {
            return new response(null, err).error500(res)
        })
})

router.patch('/:id', async (req, res) => {
    const category = Category.findById(req.params.id, (err, data) => {
        if (!data) {
            return new response(null, {
                message: 'Not Found',
            }).notFount(res)
        }
        data.name = req.body.name
        data.icon = req.body.icon
        data.color = req.body.color
        data.save((err) => {
            if (err) {
                return new response(null, err).error500(res)
            }
            return new response(data, null).created(res)
        })
    })
})

module.exports = router
