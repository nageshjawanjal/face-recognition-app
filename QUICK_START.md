# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Using Scripts (Recommended)

1. **Start Backend** (Terminal 1):
   ```bash
   ./start_backend.sh
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   ./start_frontend.sh
   ```

### Option 2: Manual Setup

#### Backend Setup:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup:
```bash
cd frontend
npm install
npm start
```

### Option 3: Docker (Advanced)
```bash
docker-compose up --build
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📱 How to Use

1. **Open** http://localhost:3000
2. **Choose** "Register New User" or "Recognize Face"
3. **Allow** camera access when prompted
4. **Follow** the on-screen instructions

## 🔧 Troubleshooting

- **Camera not working**: Ensure you're on HTTPS or localhost
- **Installation errors**: Check Python 3.8+ and Node.js 14+
- **Face not detected**: Ensure good lighting and clear face visibility

## 📁 Project Structure
```
face-recognition-webapp/
├── backend/          # FastAPI server
├── frontend/         # React app
├── start_backend.sh  # Backend startup script
├── start_frontend.sh # Frontend startup script
└── README.md         # Detailed documentation
```
