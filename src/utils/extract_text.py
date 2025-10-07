import pdfplumber
from docx import Document
from typing import Any

def extract_text_from_pdf(file_path: Any) -> str:
    with pdfplumber.open(file_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text


def extract_text_from_docx(file_path: Any) -> str:
    doc = Document(file_path)
    paragraph = [para.text for para in doc.paragraphs if para.text and para.text.strip()]
    text = "\n".join(paragraph).strip()
    return text


def extract_text(file: Any) -> str:
    if file.name.endswith(".pdf"):
        return extract_text_from_pdf(file)
    elif file.name.endswith((".docx", ".doc")):
        return extract_text_from_docx(file)
    elif file.name.endswith((".txt", ".md")):
        return file.read_text(encoding="utf-8")
    else:
        raise ValueError(f"Unsupported file format: {file.name} \n Supported formats are: .pdf, .docx, .doc, .txt, .md")