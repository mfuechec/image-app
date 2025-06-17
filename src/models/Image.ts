import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema); 