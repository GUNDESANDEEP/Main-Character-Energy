# Deployment Guide - Main Character Energy

This guide walks you through deploying your MEAN stack application to GitHub and Vercel.

## Prerequisites

1. **GitHub Account** - [Sign up at github.com](https://github.com)
2. **Vercel Account** - [Sign up at vercel.com](https://vercel.com)
3. **MongoDB Atlas Account** - [Sign up at mongodb.com/atlas](https://mongodb.com/atlas)
4. **Git** - Installed on your local machine
5. **Node.js** - Version 16+ installed

## Step 1: Setup MongoDB Atlas (Cloud Database)

1. Go to [MongoDB Atlas](https://mongodb.com/atlas)
2. Sign up / Log in
3. Create a new cluster (Free tier available)
4. Get your connection string in format: `mongodb+srv://username:password@cluster.mongodb.net/newperson`
5. Save this for later

## Step 2: Setup GitHub Repository

### Option A: Push existing code to your repo

```bash
cd "c:\Users\SANDEEP\Downloads\Mean Stack\New Person"

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Main Character Energy app"

# Add remote (replace GUNDESANDEEP with your username)
git remote add origin https://github.com/GUNDESANDEEP/Main-Character-Energy.git

# Push to main branch
git branch -M main
git push -u origin main
```

## Step 3: Update Backend for Cloud Deployment

### Update MongoDB Connection

Open `backend/server.js` and replace the MongoDB connection:

```javascript
// OLD:
mongoose.connect('mongodb://localhost:27017/newperson', {...})

// NEW:
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/newperson';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
```

### Set Environment Variables for Local Development

Create `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/newperson
HF_TOKEN=your_hugging_face_token
PORT=3001
```

## Step 4: Setup Frontend for Vercel

Update `frontend/src/app/app.component.ts`:

```typescript
// Replace 'http://localhost:3001' with your deployed backend URL
private apiBaseUrl = environment.production 
  ? 'https://your-backend-domain.vercel.app/api'
  : 'http://localhost:3001/api';
```

## Step 5: Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# In project root, login to Vercel
vercel login

# Deploy
vercel --prod
```

### Method 2: GitHub Integration (Automatic Deployment)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select root directory (leave as `/`)
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `HF_TOKEN`: Your Hugging Face token
6. Click "Deploy"

## Step 6: Configure Environment Variables on Vercel

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `HF_TOKEN` - Your Hugging Face token (for AI avatar generation)

## Step 7: Update Frontend API Endpoint

After deployment, update the API endpoint in:
- `frontend/src/app/app.component.ts`
- Change API URL from localhost to your Vercel domain

## Step 8: Test Your Deployment

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Test creating a persona
3. Upload an avatar image
4. Submit the form
5. Check MongoDB Atlas to verify data was saved

## Troubleshooting

### API calls returning 404
- Check that backend API endpoint in frontend matches deployed URL
- Verify CORS is enabled in backend

### MongoDB connection errors
- Verify `MONGODB_URI` environment variable is set
- Check MongoDB Atlas IP whitelist includes Vercel IPs

### Avatar generation not working
- Ensure `HF_TOKEN` is set in Vercel environment variables
- Check Hugging Face API status

## Additional Resources

- [Vercel Deployment Guide](https://vercel.com/docs)
- [MongoDB Atlas Setup](https://docs.mongodb.com/manual/tutorial/atlas-account-setup/)
- [Express.js Deployment](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Angular Production Build](https://angular.io/guide/build)

## Next Steps

1. Set up custom domain (optional)
2. Enable HTTPS
3. Set up monitoring and analytics
4. Configure CI/CD pipeline
