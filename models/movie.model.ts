import mongoose, {Schema, Document} from 'mongoose';

export interface IMovie extends Document {
    id: number,
    title: string,
    year: number,
    language: string,
    rating: number,
    director: string,
    image: string,
}

const MovieSchema: Schema = new Schema({
    title: {type: String, required: true, unique: true},
    year: {type: Number, required: true},
    language: {type: String},
    rating: {type: Number, required: true},
    director: {type: String},
    image: {type: String},
});

export default mongoose.model<IMovie>('Movie', MovieSchema);
