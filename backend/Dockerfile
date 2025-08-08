# ✅ Use prebuilt image with dlib, face_recognition, and OpenCV
FROM ghcr.io/corywalker/python-dlib:3.9

# Set working directory
WORKDIR /app

# Copy only requirements first for caching
COPY requirements.txt .

# ✅ Install other required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy rest of your application code
COPY . .

# Expose app port
EXPOSE 8000

# Start FastAPI server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
