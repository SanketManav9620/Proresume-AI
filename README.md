# ProResume AI 📄✨

ProResume AI is an intelligent resume analysis platform that helps job seekers optimize their resumes and find relevant job opportunities. Using advanced AI, it provides comprehensive feedback, skills assessment, and personalized job recommendations.

## ✨ Features

### 🎯 Resume Analysis
- Detailed scoring system with weighted categories
- Overall resume score out of 100
- Breakdown across skills, experience, achievements, format, and education

### 🔍 Skills Assessment
- Identification of strong skills
- Gap analysis for missing critical skills
- Targeted improvement recommendations

### 💼 Career Insights
- Role recommendations with match percentages
- Key qualification mapping
- Salary insights based on experience and location

### 📊 Job Market Integration
- Real-time job listings via LinkedIn API
- Location-based job matching
- Detailed company and position information

## 🚀 Tech Stack

### Frontend
- React
- Tailwind CSS
- Lucide Icons
- Canvas animations

### Backend
- Express.js
- Node.js
- Multer for file handling
- PDF-parse for document processing

### APIs
- Gemini AI (Gemini 3.6 Flash) for resume analysis
- LinkedIn Jobs API for job matching

## 🛠️ Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/proresume-ai.git
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create environment variables
```bash
# Backend .env
GEMINI_API_KEY=your_gemini_api_key
PORT=8080

# Frontend .env
VITE_API_URL=http://localhost:8080/analyze
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm run dev
```

## 🌐 Usage

1. Upload your resume in PDF format
2. Wait for the AI analysis to complete
3. Review your comprehensive resume analysis including:
   - Overall score and category breakdowns
   - Skills assessment
   - Career recommendations
   - Matching job opportunities

## 📈 Project Structure

```
proresume-ai/
├── backend/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── blocks/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Built with ❤️ by Krish
