from sqlalchemy.orm import Session
from ..models.user import User
from .face_service import FaceService
import numpy as np

class UserService:
    def __init__(self):
        self.face_service = FaceService()
    
    def create_user(self, db: Session, name: str, email: str, phone: str = None, 
                   department: str = None, notes: str = None, face_encoding: np.ndarray = None):
        """Create a new user with face encoding"""
        try:
            # Check if user with email already exists
            existing_user = db.query(User).filter(User.email == email).first()
            if existing_user:
                return {
                    "success": False,
                    "error": "User with this email already exists"
                }
            
            # Create new user
            user = User(
                name=name,
                email=email,
                phone=phone,
                department=department,
                notes=notes
            )
            
            if face_encoding is not None:
                user.set_face_encoding(face_encoding)
            
            db.add(user)
            db.commit()
            db.refresh(user)
            
            return {
                "success": True,
                "user": user
            }
        except Exception as e:
            db.rollback()
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_user_by_id(self, db: Session, user_id: int):
        """Get user by ID"""
        try:
            user = db.query(User).filter(User.id == user_id).first()
            return {
                "success": True,
                "user": user
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_user_by_email(self, db: Session, email: str):
        """Get user by email"""
        try:
            user = db.query(User).filter(User.email == email).first()
            return {
                "success": True,
                "user": user
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_all_users(self, db: Session):
        """Get all users"""
        try:
            users = db.query(User).all()
            return {
                "success": True,
                "users": users
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def update_user(self, db: Session, user_id: int, **kwargs):
        """Update user information"""
        try:
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                return {
                    "success": False,
                    "error": "User not found"
                }
            
            # Update fields
            for key, value in kwargs.items():
                if hasattr(user, key) and value is not None:
                    setattr(user, key, value)
            
            db.commit()
            db.refresh(user)
            
            return {
                "success": True,
                "user": user
            }
        except Exception as e:
            db.rollback()
            return {
                "success": False,
                "error": str(e)
            }
    
    def delete_user(self, db: Session, user_id: int):
        """Delete user"""
        try:
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                return {
                    "success": False,
                    "error": "User not found"
                }
            
            db.delete(user)
            db.commit()
            
            return {
                "success": True,
                "message": "User deleted successfully"
            }
        except Exception as e:
            db.rollback()
            return {
                "success": False,
                "error": str(e)
            }
    
    def recognize_user(self, db: Session, face_encoding: np.ndarray, tolerance: float = 0.6):
        """Recognize user by face encoding"""
        try:
            # Get all users
            users = db.query(User).all()
            
            # Find matching user
            result = self.face_service.find_matching_user(face_encoding, users, tolerance)
            
            return result
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
