const mongoose = require('mongoose')

const categorSchema = mongoose.Schema(
    {
        _id: { type: Number, required: true },
        name: { type: String, require: true },
        icon: { type: String },
        color: { type: String },
    },
    { timestamps: true, }
)

const Category = mongoose.model('Category', categorSchema)

module.exports = Category
