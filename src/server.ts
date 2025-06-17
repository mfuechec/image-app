import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import connectDB from './lib/mongodb';
import Image from './models/Image';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Connect to MongoDB
connectDB().catch(console.error);

// Routes
app.get('/api/images', async (req, res) => {
  try {
    const images = await Image.find({}).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

app.post('/api/images', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
    const image = await Image.create({
      url: imageUrl,
      title: req.body.title || req.file.originalname,
      description: req.body.description || 'Uploaded image'
    });

    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create image' });
  }
});

app.delete('/api/images/:id', async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 