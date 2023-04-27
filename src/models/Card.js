import {Schema, model} from 'mongoose';

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

export default model('Card', cardSchema);