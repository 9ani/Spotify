import mongoose, { Document, Schema } from 'mongoose';

export interface IArtist extends Document {
  name: string;
  description: string;
  imageUrl: string;
  songs: mongoose.Types.ObjectId[]; // Reference to Song model
}

const ArtistSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
});

export default mongoose.model<IArtist>('Artist', ArtistSchema);
