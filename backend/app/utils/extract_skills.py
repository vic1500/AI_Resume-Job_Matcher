import re
from rapidfuzz import fuzz


def extract_skills_from_text(text: str, skills: list, threshold: float = 0.70) -> set:
    text = text.lower()
    matched_skills = set()

    for skill in skills:
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        ratio = fuzz.partial_ratio(skill, text)

        if re.search(pattern, text):
            matched_skills.add(skill)
        if ratio / 100 >= threshold:
            matched_skills.add(skill)

    return matched_skills