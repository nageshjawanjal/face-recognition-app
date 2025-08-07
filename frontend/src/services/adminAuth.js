import { faceAPI } from './api';

// Admin face encoding (you'll need to register your face first)
// This should be stored securely in production
const ADMIN_FACE_ENCODING = null; // Will be set when admin registers

class AdminAuthService {
  constructor() {
    this.isAuthenticated = false;
    this.adminFaceEncoding = localStorage.getItem('adminFaceEncoding');
  }

  // Register admin face (should be done once)
  async registerAdminFace(imageFile) {
    try {
      const response = await faceAPI.detectFaces(imageFile);
      if (response.success && response.face_count > 0) {
        // Store admin face encoding
        const encodingResponse = await faceAPI.encodeFace(imageFile);
        if (encodingResponse.success) {
          this.adminFaceEncoding = encodingResponse.face_encoding;
          localStorage.setItem('adminFaceEncoding', JSON.stringify(this.adminFaceEncoding));
          return { success: true, message: 'Admin face registered successfully' };
        }
      }
      return { success: false, message: 'No face detected or encoding failed' };
    } catch (error) {
      console.log("error: ", error);
      return { success: false, message: 'Failed to register admin face' };
    }
  }

  // Authenticate admin by face
  async authenticateAdmin(imageFile) {
    try {
      if (!this.adminFaceEncoding) {
        return { success: false, message: 'Admin face not registered. Please register first.' };
      }

      const encodingResponse = await faceAPI.encodeFace(imageFile);
      if (!encodingResponse.success) {
        return { success: false, message: 'No face detected' };
      }

      // Compare with admin face encoding
      const adminEncoding = JSON.parse(this.adminFaceEncoding);
      const similarity = this.compareFaces(adminEncoding, encodingResponse.face_encoding);
      
      if (similarity > 0.6) { // Threshold for admin authentication
        this.isAuthenticated = true;
        return { success: true, message: 'Admin authenticated successfully' };
      } else {
        return { success: false, message: 'Access denied. Admin authentication failed.' };
      }
    } catch (error) {
      return { success: false, message: 'Authentication failed' };
    }
  }

  // Simple face comparison (in production, use proper face comparison)
  compareFaces(encoding1, encoding2) {
    if (!encoding1 || !encoding2) return 0;
    
    // Calculate cosine similarity
    const dotProduct = encoding1.reduce((sum, val, i) => sum + val * encoding2[i], 0);
    const magnitude1 = Math.sqrt(encoding1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(encoding2.reduce((sum, val) => sum + val * val, 0));
    
    return dotProduct / (magnitude1 * magnitude2);
  }

  // Check if admin is authenticated
  isAdminAuthenticated() {
    return this.isAuthenticated;
  }

  // Logout admin
  logout() {
    this.isAuthenticated = false;
  }

  // Check if admin face is registered
  isAdminRegistered() {
    return !!this.adminFaceEncoding;
  }
}

export default new AdminAuthService();
