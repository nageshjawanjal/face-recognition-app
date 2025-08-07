import face_recognition
import numpy as np
from PIL import Image
import io
import cv2

class FaceService:
    def __init__(self):
        self.known_face_encodings = []
        self.known_face_names = []
    
    def detect_faces(self, image_data):
        """Detect faces in an image and return their locations"""
        try:
            # Convert image data to PIL Image
            image = Image.open(io.BytesIO(image_data))
            image_array = np.array(image)
            
            # Detect face locations
            face_locations = face_recognition.face_locations(image_array)
            
            return {
                "success": True,
                "face_count": len(face_locations),
                "face_locations": face_locations
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def encode_face(self, image_data):
        """Encode a face from image data"""
        try:
            # Convert image data to PIL Image
            image = Image.open(io.BytesIO(image_data))
            image_array = np.array(image)
            
            # Detect face locations
            face_locations = face_recognition.face_locations(image_array)
            
            if not face_locations:
                return {
                    "success": False,
                    "error": "No face detected in the image"
                }
            
            if len(face_locations) > 1:
                return {
                    "success": False,
                    "error": "Multiple faces detected. Please use an image with only one face."
                }
            
            # Encode the face
            face_encoding = face_recognition.face_encodings(image_array, face_locations)[0]
            
            return {
                "success": True,
                "face_encoding": face_encoding,
                "face_location": face_locations[0]
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def compare_faces(self, face_encoding1, face_encoding2, tolerance=0.6):
        """Compare two face encodings"""
        try:
            # Convert to numpy arrays if they aren't already
            if isinstance(face_encoding1, bytes):
                face_encoding1 = np.frombuffer(face_encoding1, dtype=np.float64)
            if isinstance(face_encoding2, bytes):
                face_encoding2 = np.frombuffer(face_encoding2, dtype=np.float64)
            
            # Compare faces
            matches = face_recognition.compare_faces([face_encoding1], face_encoding2, tolerance=tolerance)
            face_distance = face_recognition.face_distance([face_encoding1], face_encoding2)[0]
            
            return {
                "success": True,
                "match": matches[0],
                "confidence": 1 - face_distance,
                "distance": face_distance
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def find_matching_user(self, face_encoding, users, tolerance=0.6):
        """Find a matching user from a list of users"""
        try:
            best_match = None
            best_confidence = 0
            
            for user in users:
                user_encoding = user.get_face_encoding()
                result = self.compare_faces(user_encoding, face_encoding, tolerance)
                
                if result["success"] and result["match"] and result["confidence"] > best_confidence:
                    best_match = user
                    best_confidence = result["confidence"]
            
            return {
                "success": True,
                "user": best_match,
                "confidence": best_confidence
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
