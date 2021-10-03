const Category = require('../database/models/Category')
const Product = require('../database/models/Product')
const response = require('../response')

const router = require('express').Router()

router.get('/', async (req, res) => {
    let filter = []
    if (req.query.categories) {
        filter = { category_id: req.query.categories.split(',') }
    }
    const product = await Product.find(filter).populate('category')
    if (product) {
        return new response(product, null).success(res)
    }
    return new response(null, 'Data Not Fount').error500(res)
})

router.post('/', async (req, res) => {
    req.body._id = parseInt(await Product.find().count())
    const product = new Product(req.body)
    product
        .save()
        .then((crerated) => {
            return new response(product, null).created(res)
        })
        .catch((err) => {
            return new response(null, err.errors).error500(res)
        })
})

router.patch('/:id', async (req, res) => {
    const product = Product.findById(req.params.id, (err, data) => {
        if (!data) {
            return new response(null, {
                message: 'Not Found',
            }).notFount(res)
        }
        data.name = req.body.name
        data.description = req.body.description
        data.richDescription = req.body.richDescription
        data.image = req.body.image
        data.brand = req.body.brand
        data.price = req.body.price
        data.category_id = req.body.category_id
        data.category = req.body.category
        data.countInStock = req.body.countInStock
        data.rating = req.body.rating
        data.numReviews = req.body.numReviews
        data.isFeatured = req.body.isFeatured
        data.save((err) => {
            if (err) {
                return new response(null, err).error500(res)
            }
            return new response(data, null).created(res)
        })
    })
})

router.delete('/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
        .then((product) => {
            if (product) {
                return new response(product, null).success(res)
            }
            return new response(null, {
                message: 'Not Found',
            }).notFount(res)
        })
        .catch((err) => {
            return new response(null, err).error500(res)
        })
})

router.get('/get/count', async (req, res) => {
    const count = await Product.find().count()
    if (count == null) {
        return new response(null, { success: false }).error500(res)
    }
    return new response({ productCount: count }, null).success(res)
})

router.get('/get/featured', async (req, res) => {
    const count = await Product.find({ isFeatured: true })
    if (count == null) {
        return new response(null, { success: false }).error500(res)
    }
    return new response(count, null).success(res)
})

router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({ isFeatured: true }).limit(count)
    if (products == null) {
        return new response(null, { success: false }).error500(res)
    }
    return new response(products, null).success(res)
})

module.exports = router
