# 🧠 Resume–Job Description Skill Matcher (Prototype)

This project is a **smart skill-matching prototype** that compares a candidate’s resume against a job description to determine how well their skills align. It identifies overlapping keywords and core technical skills, giving a quick insight into the **skill compatibility score** between both documents.

Live Demo: https://job-resume-matcher.streamlit.app/

---

## ✨ Features

- 🔍 **Text Preprocessing:** Cleans and normalizes resume and job description text for accurate comparison.  
- 🧩 **Skill Extraction:** Detects predefined technical and soft skills using regex-based word boundary matching (avoiding false matches like `"C"` in `"React"`).  
- ⚙️ **Match Scoring:** Calculates how well the resume’s skill set aligns with the job requirements.  
- 📊 **Detailed Output:** Returns matched skills, unmatched skills, and an overall compatibility percentage.  
- 🚀 **Prototype-Focused:** Built to test and refine the logic before integrating advanced NLP or embedding-based approaches.

---

## 🛠️ Tech Stack

- **Language:** Python 🐍  
- **Libraries:** `re`, `spaCy`, `pdfplumber`, `python-docx`, `streamlit` (for UI)  
- **Core Concepts:** Text processing, keyword extraction, regex pattern matching

---

## 📈 How It Works

1. The script preprocesses both the resume and job description text.  
2. It loops through a defined list of `CORE_SKILLS`.  
3. Each skill is checked using a **regex word-boundary search** to avoid substring errors.  
4. Matching skills are used to compute a similarity or compatibility score.  
5. The output includes both matched and unmatched skill sets.

---

## ⚡ Usage

### 🧩 1. Clone the Repository

```bash
git clone https://github.com/vic1500/AI_Resume-Job_Matcher.git
cd AI_Resume-Job_Matcher
```

### 🧠 2. Install Dependencies 

```bash
python -m venv .venv
source .venv/bin/activate  # For Linux/Mac
.venv\Scripts\activate     # For Windows

pip install -r requirements.txt
```

### 🧾 3. Run the App

```bash
streamlit run app.py
```

## 💡 Future Improvements

- 🧠 **Incorporate NLP-based semantic matching** using embeddings (e.g., `SentenceTransformers`, `spaCy`, or `BERT`).
- 🕵️‍♀️ **Automatically extract skills from text** using Named Entity Recognition (NER).
- 💻 **Develop a FastAPI-based backend** for scalable API access.
- 📊 **Build a professional dashboard interface** for recruiters and job seekers.
- ☁️ **Integrate into a resume screening or recruitment analytics system.**

---

## 🖋️ Author

**Arowosaye Victor Oluwadamilola**  
Frontend Developer & Aspiring ML Engineer 💻

📬 [LinkedIn](https://www.linkedin.com/in/victor-arowosaye/) | [Medium](https://medium.com/@victordman15) | [GitHub](https://github.com/vic1500)
