from pathlib import Path
import spacy
from spacy.cli.download import download
from sentence_transformers import SentenceTransformer

class ModelRegistry:
    embedding_model = None
    nlp_model = None

models = ModelRegistry()

def load_models():
    print("🔃 Loading nlp model")
    try:
        models.nlp_model = spacy.load("en_core_web_sm", disable=["parser", "ner"])
    except OSError:
        download("en_core_web_sm")
        models.nlp_model = spacy.load("en_core_web_sm", disable=["parser", "ner"])
    print("✅ nlp model loaded")


    print("🔄 Loading embedding model...")
    models.embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
    print("✅ Embedding model loaded")

