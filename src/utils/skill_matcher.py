

def compute_match_info(resume_skills: set, job_skills: set) -> dict:
    match_info = dict()
    matched_skills = resume_skills.intersection(job_skills)
    absent_skills = job_skills.difference(resume_skills)

    score = len(matched_skills) / len(job_skills) * 100

    match_info['matched_skills'] = list(matched_skills)
    match_info['absent_skills'] = list(absent_skills)
    match_info['score'] = round(score, 2)

    return match_info