# 🧠 AI Resume & Job Matcher

This is a powerful **full-stack application** designed to bridge the gap between candidates and job requirements. Unlike simple keyword counters, this tool utilizes **Natural Language Processing (NLP)** to parse resumes (PDF/DOCX), extract key entities, and calculate a **semantic compatibility score** using TF-IDF and Cosine Similarity.

It features a modern **React** frontend for a seamless user experience and a robust **FastAPI** backend for high-performance processing.

---

## ✨ Features

- 📄 **Smart Parsing:** Automatically extracts text and metadata from PDF and DOCX resumes using `pdfplumber` and `python-docx`.
- 🧠 **NLP-Powered Matching:** Uses `spaCy` and `scikit-learn` to understand context, not just exact keyword matches.
- 📊 **Similarity Scoring:** Calculates a precise percentage score representing how well a resume fits a specific job description.
- ⚡ **FastAPI Backend:** A high-speed, asynchronous REST API handling uploads, processing, and database interactions.
- 🎨 **Modern Frontend:** A responsive dashboard built with **React (Vite)**, **TypeScript**, and **Tailwind CSS**.
- 🗄️ **Database Integration:** Stores analysis results and user data using **PostgreSQL** and **SQLModel**.

---

## 🛠️ Tech Stack

### **Backend (Python)**
- **Framework:** FastAPI
- **Package Manager:** uv ⚡
- **AI/ML:** spaCy, scikit-learn, numpy
- **Database:** PostgreSQL (Neon), SQLModel (SQLAlchemy)
- **Parsing:** pdfplumber, python-docx

### **Frontend (JavaScript/TypeScript)**
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **HTTP Client:** Axios / Fetch API

### **DevOps & Tools**
- **Containerization:** Docker
- **Version Control:** Git

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/vic1500/AI_Resume-Job_Matcher.git
cd AI_Resume-Job_Matcher
```

### 2. Backend Setup (Python + uv)
This project uses `uv` for lightning-fast dependency management.
```bash
cd backend

# Create virtual environment & install dependencies
uv sync

# Or install with pip
pip install -r requirements.txt

# Create a .env file (see .env.example) and add your Database URL
# echo "DATABASE_URL=postgresql://user:pass@host/db" > .env

# Run the API server
uv run uvicorn app.main:app --reload
```
The backend will run at _`http://localhost:8000`_

### 3. Frontend Setup (React)
Open a new terminal window.

```bash
cd frontend

# Install Node dependencies
npm install

# Start the development server
npm run dev
```
The frontend will run at _`http://localhost:5173`_

## 📈 How It Works

1. **Upload:** User uploads a resume (PDF/DOCX) via the React dashboard.
2. **Parsing:** The FastAPI backend receives the file, extracts raw text, and cleans it.
3. **Vectorization:** The system converts both the resume and the job description into numerical vectors using TF-IDF.
4. **Similarity Check:** It calculates the Cosine Similarity between the two vectors to generate a match score (0-100%).
5. **Entity Extraction:** spaCy extracts specific skills, organizations, and certifications to highlight missing requirements.
6. **Result:** The frontend displays the score and a detailed breakdown of matched vs. missing skills.

---

## 💡 Future Improvements

- 🔐 **User Authentication:** Implement JWT-based login for users to save their resume history.
- 🤖 **LLM Integration:** Use OpenAI/Gemini API to provide personalized resume improvement suggestions.
- ☁️ **Cloud Storage:** Integrate AWS S3 or Google Cloud Storage for handling resume files.
- 🧪 **Unit Testing:** Add comprehensive tests using `pytest` and `React Testing Library`.

---

## 🖋️ Author

**Arowosaye Victor Oluwadamilola** Frontend Developer & Aspiring ML Engineer 💻

📬 [LinkedIn](https://www.linkedin.com/in/victor-arowosaye/) | [Medium](https://medium.com/@victordman15) | [GitHub](https://github.com/vic1500)
