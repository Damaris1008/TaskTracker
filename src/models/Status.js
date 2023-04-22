import {Schema, model} from 'mongoose';

const statusSchema = new Schema({
    status: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: false,
    versionKey: false
})

export default model('Status', statusSchema);
