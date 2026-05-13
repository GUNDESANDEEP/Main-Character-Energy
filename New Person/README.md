# Main Character Energy - Creative Challenge Application

A modern web application for JPMorganChase's "We Stand Proud" initiative's Main Character Energy Creative Challenge. This application allows students to submit their bold AI-generated personas with personalized avatars and creative prompts.

## 📋 Project Structure

```
.
├── backend/                          # Node.js/Express backend
│   ├── models/
│   │   └── Person.js                # MongoDB Person schema
│   ├── routes/
│   │   └── person.js                # API endpoints
│   ├── server.js                    # Express server
│   └── package.json
│
├── frontend/                         # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts     # Main component
│   │   │   ├── app.component.html   # Template
│   │   │   └── app.component.css    # Styles
│   │   ├── main.ts
│   │   ├── index.html
│   │   └── styles.css
│   ├── angular.json
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

## 🎯 Features

- **Step 1: Create Your Persona**
  - Enter a unique persona name
  - Write a compelling 1-2 line description capturing their vibe

- **Step 2: Generate Your AI Avatar**
  - Upload your AI-generated avatar image
  - Live preview of selected image

- **Step 3: Write Your Prompt**
  - Document the AI image generation prompt used
  - Preserve your creative process

- **Step 4: Submit Your Entry**
  - Form validation
  - Secure submission
  - Success feedback

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB service (ensure it's running locally on port 27017)

4. Run the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:4200
```

## 🔧 Technology Stack

### Frontend
- **Angular 16**: Modern web framework
- **TypeScript**: Strong typing and OOP
- **Reactive Forms**: Advanced form handling
- **CSS3**: Responsive design with gradients and animations

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **CORS**: Cross-origin support

## 📝 API Endpoints

### Persons
- `GET /api/persons` - Get all submissions
- `GET /api/persons/:id` - Get specific submission
- `POST /api/persons` - Create new submission
- `PUT /api/persons/:id` - Update submission
- `DELETE /api/persons/:id` - Delete submission

## 🎨 Design Highlights

- **Modern Gradient Design**: Purple/blue gradient theme reflecting innovation
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Form Validation**: Real-time feedback and error messages
- **Image Preview**: Live preview of uploaded avatar
- **Character Counter**: Tracks description length
- **Smooth Animations**: Elegant transitions and interactions

## 📱 Responsive Breakpoints

- Desktop: 700px+ (full layout)
- Tablet: 600px-699px (adjusted spacing)
- Mobile: Below 600px (stacked layout)

## ✨ Challenge Details

**Who Should Participate:**
- LGBTQ+ students and self-identified LGBTQ+ individuals
- All dynamic individuals from diverse backgrounds
- Anyone interested in JPMorganChase career opportunities

**Challenge Goals:**
- Celebrate confidence and self-expression
- Showcase innovation through technology and creativity
- Highlight individuality and uniqueness

## 📖 Form Requirements

1. **Persona Name**: 2+ characters
2. **Description**: 10-200 characters (1-2 lines recommended)
3. **Avatar Image**: JPG, PNG, or supported image format
4. **Prompt**: 20+ characters describing the image generation

## 🔐 Data Validation

- Client-side validation using Angular Reactive Forms
- Server-side validation for data integrity
- File type validation for images

## 📧 Example Submission

**Persona Name:** The Architect

**Description:** "She doesn't wait for the future-she builds it. Calm, precise, and completely unstoppable."

**Prompt:** "Create a futuristic AI entity resembling a sleek, glowing humanoid figure made of translucent code and circuit patterns, wearing a sleek cyberpunk jacket with neon accents..."

## 🛠️ Development

### Available Commands

**Frontend:**
```bash
npm start           # Start dev server
npm run build       # Build for production
npm run watch       # Watch mode
```

**Backend:**
```bash
npm start           # Start server
npm run dev         # Start with nodemon
```

## 📝 Notes

- Ensure MongoDB is running before starting the backend
- The frontend will attempt to connect to the backend at `http://localhost:3000`
- CORS is enabled for development purposes

## 🎉 Success

Your submission captures your Main Character Energy and begins your journey with JPMorganChase's We Stand Proud initiative!

---

**Created for:** JPMorganChase We Stand Proud Student Insights Program
**Challenge:** Main Character Energy - Creative Challenge
