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
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Card', cardSchema);