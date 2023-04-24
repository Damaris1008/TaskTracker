import {Schema, model} from 'mongoose';

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

export default model('Board', boardSchema);