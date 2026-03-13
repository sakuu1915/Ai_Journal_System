# AI Journal System

An AI-powered journaling application that analyzes user emotions, extracts keywords, and generates summaries from journal entries using Google's Gemini AI.

## 🚀 Features

* ✍️ Write and save journal entries
* 🤖 AI emotion analysis
* 🔑 Automatic keyword extraction
* 🧠 AI-generated summaries
* 📊 Mood analytics dashboard with charts
* 🌿 Ambience selection for entries (Forest, Ocean, Mountain)
* 📈 Emotion insights and statistics

## 🛠 Tech Stack

### Frontend

* React
* CSS
* Chart.js
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### AI Integration

* Google Gemini API

---

## 📂 Project Structure

```
AI-Journal-System
│
├── backend
│   ├── models
│   │   └── Journal.js
│   ├── routes
│   │   └── journalRoutes.js
│   ├── services
│   │   └── geminiService.js
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   └── MoodDashboard.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── App.css
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/ai-journal-system.git
cd ai-journal-system
```

---

### 2️⃣ Install backend dependencies

```bash
cd backend
npm install
```

---

### 3️⃣ Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the **backend folder**.

```
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

---

## ▶️ Run the Application

Start backend server:

```bash
cd backend
npm start
```

Start frontend:

```bash
cd frontend
npm run dev
```

---

## 🌐 API Endpoints

| Method | Endpoint                        | Description        |
| ------ | ------------------------------- | ------------------ |
| POST   | /api/journal                    | Save journal entry |
| GET    | /api/journal/:userId            | Fetch user entries |
| POST   | /api/journal/analyze            | Analyze emotion    |
| GET    | /api/journal/insights/:userId   | Get insights       |
| GET    | /api/journal/mood-stats/:userId | Mood chart data    |

---

## 📊 Dashboard Analytics

The system generates insights such as:

* Total journal entries
* Most frequent emotion
* Most used ambience
* Recent keywords
* Mood distribution chart

---

## 📌 Future Improvements

* Mood calendar visualization
* AI suggestions for mental wellness
* User authentication
* Export journal entries

---

## 👩‍💻 Author

**Sakshi Havaldar**

MCA Student
AI & Full Stack Developer
