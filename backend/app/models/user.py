from sqlalchemy import Column, Integer, String, DateTime, Text, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import numpy as np

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True)
    phone = Column(String(20))
    department = Column(String(100))
    notes = Column(Text)
    face_encoding = Column(LargeBinary, nullable=False)  # Store face encoding as binary
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def set_face_encoding(self, encoding):
        """Convert numpy array to binary for storage"""
        self.face_encoding = encoding.tobytes()
    
    def get_face_encoding(self):
        """Convert binary back to numpy array"""
        return np.frombuffer(self.face_encoding, dtype=np.float64)
