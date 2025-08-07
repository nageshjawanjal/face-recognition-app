import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import FaceCapture from './FaceCapture';
import { userAPI, faceAPI } from '../services/api';

const UserProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await userAPI.getUser(id);
        setUser(data);
      } catch (err) {
        setError('Failed to load user profile');
        console.error('Error loading user:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const handleFaceAuthentication = async (imageFile) => {
    try {
      setLoading(true);
      setAuthMessage('');
      
      // First recognize the face
      const recognizeResponse = await faceAPI.recognizeFace(imageFile);
      
      if (recognizeResponse.success && recognizeResponse.user_found) {
        // Check if the recognized user matches the requested profile
        if (recognizeResponse.user.id.toString() === id) {
          setIsAuthenticated(true);
          setAuthMessage('Authentication successful! You can view your profile.');
        } else {
          setAuthMessage('Access denied. You can only view your own profile.');
        }
      } else {
        setAuthMessage('Face not recognized. Please use a registered face.');
      }
    } catch (error) {
      setAuthMessage('Authentication failed. Please try again.');
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    // TODO: Implement edit functionality
    alert('Edit functionality coming soon!');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(id);
        navigate('/admin');
      } catch (err) {
        setError('Failed to delete user');
        console.error('Error deleting user:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={() => navigate('/admin')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-center">
          <div className="text-gray-600 mb-4">User not found</div>
          <button
            onClick={() => navigate('/admin')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Authentication</h1>
            <p className="text-gray-600">Authenticate with your face to view your profile</p>
          </div>

          <FaceCapture
            onCapture={handleFaceAuthentication}
            title="Authenticate Your Face"
            buttonText="Authenticate"
          />

          {loading && (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600">Authenticating...</p>
            </div>
          )}

          {authMessage && (
            <div className="mt-4 p-4 rounded-lg">
              {authMessage.includes('successful') ? (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {authMessage}
                  </div>
                </div>
              ) : (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {authMessage}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/admin')}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h1>
          <p className="text-gray-600">View and manage user information</p>
        </div>

        <UserProfile 
          user={user} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/admin')}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
