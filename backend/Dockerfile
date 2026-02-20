# 1. Use a lightweight Python base image
FROM python:3.11-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy requirements and install securely without caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy the rest of your application code
COPY . .

# 5. --- THE SECURITY FIX ---
# Create a standard user (ID 10014) with a home directory.
# Then, give this new user ownership of the /app folder so it can read/write files.
RUN useradd -u 10014 -m appuser && chown -R appuser /app

# Switch to the new, secure user
USER 10014
# ---------------------------

# 6. Expose the port your app uses
EXPOSE 8000

# 7. Start the live server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]