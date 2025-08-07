import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FaceCapture from './FaceCapture';
import Dashboard from './Dashboard';
import adminAuthService from '../services/adminAuth';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(adminAuthService.isAdminAuthenticated());
  const [isRegistering, setIsRegistering] = useState(!adminAuthService.isAdminRegistered());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAdminFaceCapture = async (imageFile) => {
    setLoading(true);
    setMessage('');

    try {
      if (isRegistering) {
        // Register admin face
        const result = await adminAuthService.registerAdminFace(imageFile);
        if (result.success) {
          setIsRegistering(false);
          setMessage('Admin face registered successfully! You can now access the dashboard.');
        } else {
          setMessage(result.message);
        }
      } else {
        // Authenticate admin
        const result = await adminAuthService.authenticateAdmin(imageFile);
        if (result.success) {
          setIsAuthenticated(true);
          setMessage('Admin authenticated successfully!');
        } else {
          setMessage(result.message);
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminAuthService.logout();
    setIsAuthenticated(false);
    setMessage('');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex space-x-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Logout Admin
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
        <Dashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isRegistering ? 'Register Admin Face' : 'Admin Authentication'}
          </h1>
          <p className="text-gray-600">
            {isRegistering 
              ? 'Register your face to access the admin dashboard'
              : 'Authenticate with your face to access the admin dashboard'
            }
          </p>
        </div>

        <FaceCapture
          onCapture={handleAdminFaceCapture}
          title={isRegistering ? "Register Your Face" : "Authenticate Your Face"}
          buttonText={isRegistering ? "Register Admin" : "Authenticate"}
        />

        {loading && (
          <div className="mt-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-gray-600">
              {isRegistering ? 'Registering admin face...' : 'Authenticating...'}
            </p>
          </div>
        )}

        {message && (
          <div className="mt-4 p-4 rounded-lg">
            {message.includes('successfully') ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {message}
                </div>
              </div>
            ) : (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {message}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
