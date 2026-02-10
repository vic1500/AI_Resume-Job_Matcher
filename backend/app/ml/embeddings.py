from typing import Any
from sentence_transformers import util
from ..core.model_loader import  models

def compute_embeddings(text: str) -> Any:
    return models.embedding_model.encode(text, convert_to_tensor=True)

def compute_similarity(text_a: str, text_b:str) -> float:
    text_a_encoded = compute_embeddings(text_a)
    text_b_encoded = compute_embeddings(text_b)
    cosine_sim = util.cos_sim(text_a_encoded, text_b_encoded)

    return cosine_sim.item()