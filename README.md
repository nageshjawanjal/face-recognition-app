# Face Recognition Web Application

A complete face recognition system for user identification and registration, built with FastAPI (backend) and React (frontend).

## Features

- **Face Detection**: Detect faces in uploaded images
- **Face Recognition**: Identify registered users by their face
- **User Registration**: Register new users with face capture and personal information
- **User Management**: View, edit, and delete user profiles
- **Modern UI**: Responsive web interface with real-time camera capture
- **Secure Storage**: Encrypted face embeddings stored in database

## Technology Stack

### Backend
- **FastAPI**: Modern Python web framework
- **Face Recognition**: dlib-based face detection and encoding
- **SQLAlchemy**: Database ORM
- **SQLite**: Database (can be easily switched to PostgreSQL)

### Frontend
- **React**: Modern JavaScript framework
- **Tailwind CSS**: Utility-first CSS framework
- **React Webcam**: Camera integration
- **Axios**: HTTP client for API communication

## Project Structure

```
face-recognition-webapp/
├── backend/
│   ├── app/
│   │   ├── models/          # Database models
│   │   ├── services/        # Business logic
│   │   ├── api/            # API routes
│   │   └── database/       # Database connection
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   └── services/       # API services
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

source venv/bin/activate && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

The backend will be available at `http://localhost:8000`
API documentation will be available at `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## Usage

### 1. Home Page
- **Recognize Face**: Identify existing users
- **Register New User**: Add new users to the system
- **View Dashboard**: Manage all registered users

### 2. Face Recognition
- Allow camera access
- Position your face in the center
- Click "Recognize" to identify yourself
- View your profile if found, or register if not found

### 3. User Registration
- Capture your face using the camera
- Fill in personal information (name, email, phone, etc.)
- Click "Register User" to create your profile

### 4. Dashboard
- View all registered users
- Access individual user profiles
- Edit or delete user accounts

## API Endpoints

### Face Recognition
- `POST /api/face/detect` - Detect faces in image
- `POST /api/face/recognize` - Recognize face and return user

### User Management
- `POST /api/users/register` - Register new user with face
- `GET /api/users/{user_id}` - Get user profile
- `GET /api/users/` - Get all users
- `PUT /api/users/{user_id}` - Update user information
- `DELETE /api/users/{user_id}` - Delete user

## Security Features

- Face embeddings are stored as encrypted binary data
- No raw face images are stored in the database
- API endpoints include proper error handling
- CORS configured for secure cross-origin requests

## Development

### Adding New Features
1. Backend: Add new routes in `app/api/` and services in `app/services/`
2. Frontend: Create new components in `src/components/` and update routing

### Database Migrations
The application uses SQLite by default. To switch to PostgreSQL:
1. Update `DATABASE_URL` in `.env`
2. Install `pgvector` for PostgreSQL
3. Update database connection settings

## Troubleshooting

### Common Issues

1. **Camera not working**: Ensure HTTPS or localhost for camera access
2. **Face not detected**: Ensure good lighting and face is clearly visible
3. **Installation errors**: Check Python/Node.js versions and dependencies

### Performance Tips

- Use high-quality images for better recognition accuracy
- Ensure proper lighting conditions
- Consider using GPU acceleration for face recognition in production

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues and questions, please create an issue in the repository.
