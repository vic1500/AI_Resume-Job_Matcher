from io import BytesIO
from typing import Any
import pdfplumber
from docx import Document

def extract_text_from_pdf(file_byte: bytes) -> str:
    with pdfplumber.open(BytesIO(file_byte)) as pdf:
        text = []
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text.append(page_text)
    return "\n".join(text)


def extract_text_from_docx(file_byte: bytes) -> str:
    doc = Document(BytesIO(file_byte))
    paragraph = [para.text for para in doc.paragraphs if para.text and para.text.strip()]
    text = "\n".join(paragraph).strip()
    return text


def extract_text(file_bytes: bytes, file_name: str) -> str:
    filename = file_name.lower().strip()
    if filename.endswith(".pdf"):
        return extract_text_from_pdf(file_bytes)
    elif filename.endswith((".docx", ".doc")):
        return extract_text_from_docx(file_bytes)
    elif filename.endswith((".txt", ".md")):
        return file_bytes.decode(encoding="utf-8", errors="ignore")
    else:
        raise ValueError(f"Unsupported file format: {filename} \n Supported formats are: .pdf, .docx, .doc, .txt, .md")