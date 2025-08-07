from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from typing import Optional
from ..database import get_db
from ..services.user_service import UserService
from ..services.face_service import FaceService
import numpy as np

router = APIRouter(prefix="/api/users", tags=["users"])

user_service = UserService()
face_service = FaceService()

@router.post("/register")
async def register_user(
    name: str = Form(...),
    email: str = Form(...),
    phone: Optional[str] = Form(None),
    department: Optional[str] = Form(None),
    notes: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Register a new user with face image"""
    try:
        # Read image data
        image_data = await file.read()
        
        # Encode face
        encode_result = face_service.encode_face(image_data)
        if not encode_result["success"]:
            raise HTTPException(status_code=400, detail=encode_result["error"])
        
        face_encoding = encode_result["face_encoding"]
        
        # Create user
        result = user_service.create_user(
            db=db,
            name=name,
            email=email,
            phone=phone,
            department=department,
            notes=notes,
            face_encoding=face_encoding
        )
        
        if not result["success"]:
            raise HTTPException(status_code=400, detail=result["error"])
        
        # Return user info (without face encoding)
        user = result["user"]
        user_info = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "department": user.department,
            "notes": user.notes,
            "created_at": user.created_at
        }
        
        return {
            "success": True,
            "message": "User registered successfully",
            "user": user_info
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{user_id}")
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get user by ID"""
    result = user_service.get_user_by_id(db, user_id)
    
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])
    
    if result["user"] is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Return user info (without face encoding)
    user = result["user"]
    user_info = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "department": user.department,
        "notes": user.notes,
        "created_at": user.created_at,
        "updated_at": user.updated_at
    }
    
    return user_info

@router.get("/")
async def get_all_users(db: Session = Depends(get_db)):
    """Get all users"""
    result = user_service.get_all_users(db)
    
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])
    
    # Return user info (without face encodings)
    users_info = []
    for user in result["users"]:
        user_info = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "department": user.department,
            "notes": user.notes,
            "created_at": user.created_at
        }
        users_info.append(user_info)
    
    return users_info

@router.put("/{user_id}")
async def update_user(
    user_id: int,
    name: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    phone: Optional[str] = Form(None),
    department: Optional[str] = Form(None),
    notes: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """Update user information"""
    update_data = {}
    if name is not None:
        update_data["name"] = name
    if email is not None:
        update_data["email"] = email
    if phone is not None:
        update_data["phone"] = phone
    if department is not None:
        update_data["department"] = department
    if notes is not None:
        update_data["notes"] = notes
    
    result = user_service.update_user(db, user_id, **update_data)
    
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["error"])
    
    # Return updated user info
    user = result["user"]
    user_info = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "department": user.department,
        "notes": user.notes,
        "created_at": user.created_at,
        "updated_at": user.updated_at
    }
    
    return user_info

@router.delete("/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete user"""
    result = user_service.delete_user(db, user_id)
    
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return {"message": "User deleted successfully"}
