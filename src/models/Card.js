const {Schema, model} = require('mongoose');

const cardSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        required: false,
        trim: true
    },
    user: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Card', cardSchema);