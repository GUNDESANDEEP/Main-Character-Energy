const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/newperson', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
const personRoutes = require('./routes/person');
app.use('/api/persons', personRoutes);

// AI Avatar Generation Route
app.post('/api/generate-avatar', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Using Hugging Face Inference API (free tier)
    // Note: You need to set HF_TOKEN environment variable
    
    const HF_TOKEN = process.env.HF_TOKEN;
    
    if (!HF_TOKEN) {
      // Return a mock/placeholder image for demo purposes
      console.warn('HF_TOKEN not set. Using placeholder image.');
      return res.json({
        imageUrl: 'https://via.placeholder.com/512x512?text=AI+Avatar+Generator',
        message: 'Demo mode: Configure HF_TOKEN for real AI generation'
      });
    }

    try {
      // Try Stable Diffusion XL (more reliable)
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl',
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer',
          timeout: 120000
        }
      );

      const base64Image = Buffer.from(response.data).toString('base64');
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;

      res.json({ imageUrl });
    } catch (hfError) {
      console.warn('Hugging Face API error, using placeholder:', hfError.message);
      // Return placeholder on error for demo
      res.json({
        imageUrl: 'https://via.placeholder.com/512x512?text=AI+Generated+Avatar',
        message: 'Using demo mode. Get free HF token for real AI images.'
      });
    }
  } catch (error) {
    console.error('AI Generation Error:', error.message);
    res.status(500).json({
      error: 'Failed to generate avatar',
      details: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));