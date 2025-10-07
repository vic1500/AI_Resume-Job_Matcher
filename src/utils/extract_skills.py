import re

def extract_skills_from_text(text: str, skills: list) -> set:
    text = text.lower()
    matched_skills = set()

    for skill in skills:
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        if re.search(pattern, text):
            matched_skills.add(skill)
    return matched_skills