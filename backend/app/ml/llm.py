import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.environ.get("FIREWORKS_API_KEY")


def get_insights(resume: str, job_desc: str, match_info: dict, final_score: float) -> str:
    client = OpenAI(
        api_key=api_key,
        base_url="https://api.fireworks.ai/inference/v1"
    )

    response = client.chat.completions.create(
        model="accounts/fireworks/models/deepseek-v3p1",
        messages=[
            {
                "role": "system",
                "content": """
                You are an expert resume reviewer. You take the following inputs:
                1) Job description
                2) Resume
                3) Match JSON
                4) Final Score

                Task:
                - Provide a Heading of "Summary of Candidate fit" using one hastag for markdown (that is, # Summary of Candidate Fit) and for subsequent headers add two hastags and make the text of all headers bold.
                - Provide a 2 sentence summary of candidate fit.
                - Give reasons based on the final score as to why the candidate got that score. Then add two new lines.
                - List top 5 actionable improvement items (priority order) that the candidate can add to their resume to increase fit with the job. Then add two new lines.
                - For three important missing skills, suggest exact bullet lines the candidate should add to the "Projects" or "Experience" section (use concrete measurable wording).
                - Explain each suggestion referencing the fields in the Match JSON (e.g., "Because 'aws' is in missing_skills, add: ...").

                Do not invent facts. Use only resume and match JSON and don't add any final notes or borders. 

                This is an example of what your response should look like. Follow it strictly:

                # Summary of Candidate Fit

                ## **Summary**  
                The candidate has leadership and software development experience but lacks direct alignment with the core technical requirements of the Data Analyst/Junior Machine Learning Engineer role. The final score of 54.8% reflects a partial fit due to limited exposure to key data analysis and machine learning tools and methodologies.

                ## **Reasons for Score**  
                The score is moderate because, while the candidate has experience in software development and mentions machine learning in their education, the resume lacks evidence of hands-on application with required tools like Python, pandas, scikit-learn, SQL, and data visualization libraries. Many skills listed in 'absent_skills' in the Match JSON are critical for this role.

                ## **Top 5 Actionable Improvements**  
                1. Add specific examples of using Python for data analysis or machine learning tasks.  
                2. Include experience with SQL for data querying and manipulation.  
                3. Demonstrate use of data visualization tools like Matplotlib, Seaborn, or Power BI.  
                4. Highlight projects involving machine learning algorithms such as classification or regression.  
                5. Showcase any experience with model deployment using Flask, FastAPI, or similar frameworks.  

                ## **Suggested Bullet Points for Missing Skills**  
                - Because 'python' and 'pandas' are in absent_skills, add: "Utilized Python and pandas to clean and analyze a dataset of 10,000+ records, improving data accuracy by 15% for business insights."  
                - Because 'sql' is in absent_skills, add: "Developed SQL queries to extract and transform data from relational databases, reducing report generation time by 20%."  
                - Because 'matplotlib' is in absent_skills, add: "Created interactive visualizations using Matplotlib to present trends and patterns to stakeholders, enhancing decision-making processes."

            """
            },
            {
                "role": "user",
                "content": f"""
                Job description: 
                {job_desc},
                Resume:
                {resume},
                Match JSON:
                {match_info},
                Final Score:
                {final_score * 100}%
            """
            }

        ]
    )

    return response.choices[0].message.content