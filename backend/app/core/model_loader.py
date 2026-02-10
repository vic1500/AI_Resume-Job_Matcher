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
    current_file_dir = Path(__file__).parent
    model_path = current_file_dir.parent / "ml" / "all-MiniLM-L6-v2"
    if not model_path.exists():
        raise FileNotFoundError(f"❌ Could not find model directory at: {model_path.resolve()}")

    print(f"📂 Loading from absolute path: {model_path.resolve()}")

    models.embedding_model = SentenceTransformer(str(model_path))
    print("✅ Embedding model loaded")

