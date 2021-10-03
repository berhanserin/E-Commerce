const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema(
    {
        _id: { type: Number, required: true },
        name: {
            type: String,
            require: true,
            trim: true,
        },
        description: { type: String, required: true },
        richDescription: { type: String, default: '' },
        image: { type: String, default: '' },
        images: [{ type: String }],
        brand: { type: String, default: '' },
        price: { type: Number, default: 0 },
        category_id: { type: Number },
        countInStock: {
            type: Number,
            required: true,
        },
        rating: { type: Number, default: 0 },
        numeviews: { type: Number, default: 0 },
        isFeatured: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        id: false,
        toJSON: { virtuals: true },
    }
)

ProductSchema.virtual('category', {
    ref: 'Category',
    localField: 'category_id',
    foreignField: '_id',
    justOne: false,
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
