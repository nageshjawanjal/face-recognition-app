# ✅ Use davisking's dlib image (public and includes dlib)
FROM davisking/dlib:latest

# Install pip & Python packages
RUN apt-get update && apt-get install -y \
    python3-pip \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .

RUN pip3 install --no-cache-dir --upgrade pip \
    && pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of your app
COPY . .

# Expose port for FastAPI
EXPOSE 8000

# Start the FastAPI app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
