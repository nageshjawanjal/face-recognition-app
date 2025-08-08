# ✅ Use a known working base image with dlib + OpenCV
FROM belaytechnologies/face-recognition:latest

# Set working directory
WORKDIR /app

# Copy requirements.txt and install other dependencies
COPY requirements.txt .

# Install only your additional Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your code
COPY . .

# Expose the FastAPI port
EXPOSE 8000

# Start the FastAPI app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
