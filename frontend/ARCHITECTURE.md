# AI Journal System Architecture

## Overview

The AI Journal System follows a **full-stack architecture** consisting of three main layers:

1. Frontend (User Interface)
2. Backend (API Server)
3. Database + AI Services

---

## System Architecture

```
User
 │
 ▼
Frontend (React)
 │
 ▼
REST API (Express.js)
 │
 ├── MongoDB Database
 │
 └── Gemini AI API
```

---

## 1️⃣ Frontend Layer

Technology: React

Responsibilities:

* User interface for writing journals
* Display emotion analysis
* Display analytics charts
* Communicate with backend APIs

Main Components:

* App.jsx
* MoodDashboard.jsx
* Journal UI components

---

## 2️⃣ Backend Layer

Technology: Node.js + Express.js

Responsibilities:

* Handle API requests
* Store journal entries
* Call Gemini AI for emotion analysis
* Generate analytics insights

Main Modules:

```
routes/
 journalRoutes.js

services/
 geminiService.js

models/
 Journal.js
```

---

## 3️⃣ Database Layer

Technology: MongoDB

Collection:

Journal

Example Document:

```
{
 userId: "123",
 text: "Today was a productive day",
 emotion: "joy",
 keywords: ["productive", "happy"],
 summary: "User had a positive and productive day",
 ambience: "forest",
 createdAt: Date
}
```

---

## 4️⃣ AI Integration

AI service used:

Google Gemini API

Process:

1. User writes journal entry
2. Text sent to backend
3. Backend sends request to Gemini
4. AI returns emotion, keywords, and summary
5. Data stored in database
6. Results displayed in UI

---

## 5️⃣ Data Flow

```
User writes journal
       │
       ▼
Frontend sends POST request
       │
       ▼
Backend stores entry in MongoDB
       │
       ▼
User clicks analyze
       │
       ▼
Backend calls Gemini AI
       │
       ▼
Emotion + Keywords + Summary returned
       │
       ▼
Database updated
       │
       ▼
Frontend displays analysis + charts
```

---

## 6️⃣ Analytics Generation

Insights are calculated using MongoDB aggregation.

Examples:

* Emotion distribution
* Most frequent emotion
* Top ambience
* Keyword extraction

---

## 7️⃣ Security Considerations

* Environment variables for API keys
* Input validation
* Secure database connection

---

## Conclusion

This architecture enables scalable AI-powered journaling with analytics and emotion tracking using modern full-stack technologies.
