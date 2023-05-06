const {Schema, model} = require('mongoose');

const boardSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Board', boardSchema);