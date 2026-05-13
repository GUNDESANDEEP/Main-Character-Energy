# 🚀 Complete Live Deployment Guide

Your **Main Character Energy** app is live on Vercel! Now let's deploy the backend to Railway and connect them.

## ✅ Current Status

- ✅ **Frontend**: Deployed on Vercel  
- ⏳ **Backend**: Ready to deploy on Railway
- ⏳ **Database**: MongoDB Atlas (free tier)

---

## 🔧 Step 1: Set Up MongoDB Atlas (Cloud Database)

### 1.1 Create MongoDB Cluster
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Sign up/Login with your account
3. Click **"Create Deployment"** → Select **Free (M0)**
4. Choose region closest to you
5. Create cluster

### 1.2 Get Connection String
1. In MongoDB Atlas, go to **"Database"** → Your Cluster
2. Click **"Connect"** button
3. Choose **"Drivers"** → **"Node.js"**
4. Copy the connection string:
```
mongodb+srv://username:password@cluster-name.mongodb.net/newperson?retryWrites=true&w=majority
```
5. Replace `username` and `password` with your credentials
6. Keep this handy for Railway setup

---

## 🚂 Step 2: Deploy Backend on Railway

### 2.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (easiest option)
3. Click **"Start a New Project"**

### 2.2 Deploy from GitHub
1. Click **"Deploy from GitHub"**
2. Select your **Main-Character-Energy** repository
3. Choose **"Single Service"** option
4. Railway will auto-detect Node.js backend
5. Click **"Deploy"**

### 2.3 Configure Environment Variables on Railway
After deployment starts:

1. Go to your Railway project dashboard
2. Click on the **Backend Service**
3. Go to **"Variables"** tab
4. Add these environment variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/newperson?retryWrites=true&w=majority` |
| `HF_TOKEN` | Your Hugging Face API token (free from huggingface.co) |
| `FRONTEND_URL` | Your Vercel app URL (e.g., `https://main-character-energy-xxx.vercel.app`) |
| `PORT` | `3001` |

### 2.4 Get Your Backend URL
1. In Railway, go to **"Deployments"** 
2. Find your deployment and click it
3. Under **"Domains"**, copy the public URL (e.g., `https://railway-app-xxx.up.railway.app`)
4. Keep this URL for the next step

---

## 🔌 Step 3: Connect Frontend to Backend

### 3.1 Update Vercel Environment Variables

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on **Main-Character-Energy** project
3. Go to **Settings** → **Environment Variables**
4. Add:

| Name | Value |
|------|-------|
| `BACKEND_URL` | Your Railway URL from Step 2.4 |

### 3.2 Update Frontend Code (Optional - for different backends)

If you need to use a different backend URL in production, create a `.env` file in frontend:

```
VITE_BACKEND_URL=https://your-railway-app.up.railway.app/api
```

Or update [frontend/src/environments/environment.prod.ts](frontend/src/environments/environment.prod.ts):

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-railway-app.up.railway.app/api'
};
```

Then redeploy Vercel.

---

## 📝 Step 4: Get Hugging Face Token (for AI Avatar Generation)

### 4.1 Create Free Account
1. Go to [huggingface.co](https://huggingface.co)
2. Sign up and verify email
3. Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
4. Click **"New token"**
5. Create token with **"read"** permission
6. Copy the token

### 4.2 Add to Railway
1. Go to Railway → Your Backend Service → **Variables**
2. Add `HF_TOKEN` = your copied token

---

## 🧪 Step 5: Test Your Live App

### 5.1 Test Frontend
1. Go to your Vercel URL: `https://main-character-energy-xxx.vercel.app`
2. Try filling out the form
3. Click "Generate Avatar" to test AI generation
4. Submit the form
5. Check MongoDB Atlas to see if data was saved

### 5.2 Check Backend Logs
In Railway:
1. Click on your Backend Service
2. Go to **"Logs"** tab
3. Check for any errors

### 5.3 Test Direct API Call
Open browser console and run:
```javascript
fetch('https://your-railway-app.up.railway.app/api/generate-avatar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'test' })
})
.then(r => r.json())
.then(console.log)
```

---

## 🎯 Final Checklist

- [ ] MongoDB Atlas cluster created and connection string copied
- [ ] Railway account created
- [ ] Backend deployed on Railway
- [ ] Environment variables set on Railway (MONGODB_URI, HF_TOKEN, FRONTEND_URL)
- [ ] Vercel app can connect to Railway backend
- [ ] Form submission works
- [ ] Data appears in MongoDB Atlas
- [ ] Avatar generation works (or uses placeholder in demo mode)

---

## 📊 Your Live URLs

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | `https://main-character-energy-xxx.vercel.app` | ✅ Live |
| **Backend API** | `https://your-railway-app.up.railway.app/api` | ⏳ Deploying |
| **Database** | MongoDB Atlas | ⏳ Configuring |
| **GitHub** | `https://github.com/GUNDESANDEEP/Main-Character-Energy` | ✅ Live |

---

## 🐛 Troubleshooting

### Avatar Generation Shows "Demo Mode"
- **Cause**: `HF_TOKEN` not set on Railway
- **Fix**: Add `HF_TOKEN` to Railway environment variables

### Form Submission Fails
- **Cause**: Backend not running or wrong URL
- **Fix**: Check Railway logs and verify `FRONTEND_URL` is set correctly

### MongoDB Connection Error
- **Cause**: Connection string is wrong
- **Fix**: Get fresh connection string from MongoDB Atlas

### CORS Error in Browser Console
- **Cause**: Frontend can't reach backend
- **Fix**: Verify backend URL and `FRONTEND_URL` environment variable

---

## 📚 Useful Links

- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas Docs](https://docs.mongodb.com/atlas)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Hugging Face API Docs](https://huggingface.co/docs/api-inference)

---

**Next Step**: Follow the steps above to deploy your backend and connect it to your live frontend! 🚀
