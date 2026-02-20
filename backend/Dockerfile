# 1. Use a lightweight Python base image
FROM python:3.11-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy just the requirements file first (this caches the installation step)
COPY requirements.txt .

# 4. The Magic Bullet: Install packages and force pip NOT to save the downloaded cache files
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of your application code
COPY . .

# 6. Tell the container what port to use (standard for web apps)
EXPOSE 8000

# 7. Start the application (matching what your log said it was trying to do)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]