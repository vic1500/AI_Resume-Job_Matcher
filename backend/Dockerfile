# 1. Use a lightweight Python base image
FROM python:3.11-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy requirements and install securely without caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy the rest of your application code
COPY . .

# 5. --- THE CACHE FIX ---
# Tell all Machine Learning libraries to use the writable /tmp folder
ENV HF_HOME=/tmp/huggingface
ENV TRANSFORMERS_CACHE=/tmp/huggingface
ENV SENTENCE_TRANSFORMERS_HOME=/tmp/sentence_transformers
ENV MPLCONFIGDIR=/tmp/matplotlib

# 6. --- THE SECURITY FIX ---
RUN useradd -u 10014 -m appuser && chown -R appuser /app
# Switch to the new, secure user
USER 10014
# ---------------------------

# 7. Expose the port your app uses
EXPOSE 8000

# 8. Start the live server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]