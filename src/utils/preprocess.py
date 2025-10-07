import spacy
import spacy
from spacy.cli.download import download

try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")


def preprocess_text(text: str) -> str:
    doc = nlp(text)
    tokens = []

    for tok in doc:
        if tok.is_stop or tok.is_punct or tok.is_space:
            continue
        tok_lemma = tok.lemma_.lower()

        if len(tok_lemma) <= 1 and not tok_lemma.isalpha():
            continue

        tokens.append(tok_lemma)

    return " ".join(tokens)