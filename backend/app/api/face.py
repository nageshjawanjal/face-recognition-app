from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.face_service import FaceService
from ..services.user_service import UserService

router = APIRouter(prefix="/api/face", tags=["face"])

face_service = FaceService()
user_service = UserService()

@router.post("/detect")
async def detect_faces(file: UploadFile = File(...)):
    """Detect faces in uploaded image"""
    try:
        image_data = await file.read()

        result = face_service.detect_faces(image_data)
        if not result["success"]:
            raise HTTPException(status_code=400, detail=result["error"])

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/recognize")
async def recognize_face(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Recognize face and return user if found"""
    try:
        image_data = await file.read()

        encode_result = face_service.encode_face(image_data)
        if not encode_result["success"]:
            raise HTTPException(status_code=400, detail=encode_result["error"])

        face_encoding = encode_result["face_encoding"]

        result = user_service.recognize_user(db, face_encoding)

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        if result["user"] is None:
            return {
                "success": True,
                "user_found": False,
                "message": "No matching user found"
            }

        user_info = {
            "id": result["user"].id,
            "name": result["user"].name,
            "email": result["user"].email,
            "phone": result["user"].phone,
            "department": result["user"].department,
            "notes": result["user"].notes,
            "created_at": result["user"].created_at,
            "confidence": result["confidence"]
        }

        return {
            "success": True,
            "user_found": True,
            "user": user_info
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/encode")
async def encode_face(file: UploadFile = File(...)):
    """Encode face in uploaded image"""
    try:
        image_data = await file.read()

        result = face_service.encode_face(image_data)

        if not result["success"]:
            raise HTTPException(status_code=400, detail=result["error"])

        # Ensure face_encoding is JSON serializable (convert from NumPy array if needed)
        encoding = result["face_encoding"]
        if hasattr(encoding, 'tolist'):
            encoding = encoding.tolist()

        return {
            "success": True,
            "face_encoding": encoding
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
