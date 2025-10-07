import streamlit as st

from src.utils.extract_text import extract_text
from src.utils.preprocess import preprocess_text
from src.skills.skills import CORE_SKILLS
from src.utils.skill_matcher import compute_match_info
from src.utils.extract_skills import extract_skills_from_text

st.set_page_config(page_title="AI Resume-Job Matcher", page_icon="🤖", layout="centered")

st.title("AI Resume-Job Matcher")
st.header("Upload your resume and a job description to see how well they match.")

st.write("Please upload your resume and job description files in PDF or DOCX format.")

resume_file = st.file_uploader("Upload Resume", type=["pdf", "docx"])
job_description_file = st.file_uploader("Upload Job Description", type=["pdf", "docx"])

calc_match_btn = st.button("Calculate Match", type="primary")

if calc_match_btn:
    if not resume_file or not job_description_file:
        st.error("You need to upload a resume file and a job description file!")
        st.stop()
    else:
        resume_text = extract_text(resume_file)
        job_description_text = extract_text(job_description_file)

        st.subheader("Extracted Resume Text")
        st.text_area("Resume Text", resume_text, height=200)

        st.subheader("Extracted Job Description Text")
        st.text_area("Job Description Text", job_description_text, height=200)

        resume_text_cleaned = preprocess_text(resume_text)
        job_description_text_cleaned = preprocess_text(job_description_text)

        resume_text_skills = extract_skills_from_text(resume_text_cleaned, CORE_SKILLS)
        job_description_text_skills = extract_skills_from_text(job_description_text_cleaned, CORE_SKILLS)

        match_info = compute_match_info(resume_text_skills, job_description_text_skills)

        st.subheader("Match Information")
        st.write(f"Match Score: {match_info['score']}%")
        st.write(f"Matched Skills: {', '.join(match_info['matched_skills']) if match_info['matched_skills'] else 'None'}")
        st.write(f"Absent Skills: {', '.join(match_info['absent_skills']) if match_info['absent_skills'] else 'None'}")

        if match_info['score'] > 70:
            st.success("✅ Great match! Your resume aligns well with the job description.")
        elif match_info['score'] > 40:
            st.warning("⚠️ Moderate match. Consider tailoring your resume to better fit the job description.")
        else:
            st.error("❌ Poor match. We recommend overhauling your resume to better align with the job description.")
