import { Schema, model, models } from 'mongoose';

const PaletteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    palette: {
        type: [String],
        required: true
    },
    tag: {
        type: String,
        required: true
    }
});


const Palette = models.Palette || model('Palette', PaletteSchema);

export default Palette;