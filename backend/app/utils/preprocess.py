from ..core.model_loader import models


def preprocess_text(text: str) -> str:
    doc = models.nlp_model(text)
    tokens = []

    for tok in doc:
        if tok.is_stop or tok.is_punct or tok.is_space:
            continue
        tok_lemma = tok.lemma_

        if len(tok_lemma) <= 1 and not tok_lemma.isalpha():
            continue

        tokens.append(tok_lemma.lower())

    return " ".join(tokens)