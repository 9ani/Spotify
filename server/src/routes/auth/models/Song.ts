import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string;
  album: string;
  songUrl: string;
  imageUrl: string;
}

const SongSchema: Schema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  songUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.model<ISong>('Song', SongSchema);
