from ..ml.embeddings import compute_similarity
from ..ml.skill_matching import compute_match_info
from ..utils.extract_skills import extract_skills_from_text
from ..utils.extract_text import extract_text
from ..utils.preprocess import preprocess_text
from ..utils.skills import CORE_SKILLS
from ..ml.llm import get_insights

def compute_final_score(
    resume_bytes: bytes,
    resume_filename: str,
    jd_bytes: bytes,
    jd_filename: str,
    alpha: float = 0.7,
    show_insights: bool = True
):
    # Extract text
    resume_text = extract_text(resume_bytes, resume_filename)
    job_description_text = extract_text(jd_bytes, jd_filename)

    # Preprocess
    resume_clean = preprocess_text(resume_text)
    jd_clean = preprocess_text(job_description_text)

    # Skill extraction
    resume_skills = extract_skills_from_text(resume_clean, CORE_SKILLS)
    jd_skills = extract_skills_from_text(jd_clean, CORE_SKILLS)

    # Matching
    match_info = compute_match_info(resume_skills, jd_skills)
    semantic_score = compute_similarity(resume_clean, jd_clean)

    # Weighted final score
    final_score = alpha * semantic_score + (1 - alpha) * match_info["score"]

    insights = ""
    if show_insights:
        insights = get_insights(
            resume_text,
            job_description_text,
            match_info,
            final_score
        )

    return final_score, match_info, insights
