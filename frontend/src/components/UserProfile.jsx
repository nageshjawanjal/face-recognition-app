import React from 'react';

const UserProfile = ({ user, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      <div className="space-y-4">
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-500">Phone</label>
              <p className="text-gray-900">{user.phone || 'Not provided'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Department</label>
              <p className="text-gray-900">{user.department || 'Not specified'}</p>
            </div>
            
            {user.notes && (
              <div>
                <label className="block text-sm font-medium text-gray-500">Notes</label>
                <p className="text-gray-900">{user.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Information</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-500">User ID</label>
              <p className="text-gray-900">#{user.id}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Registered</label>
              <p className="text-gray-900">{formatDate(user.created_at)}</p>
            </div>
            
            {user.updated_at && (
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-gray-900">{formatDate(user.updated_at)}</p>
              </div>
            )}
          </div>
        </div>

        {user.confidence && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-500">Recognition Confidence</label>
              <span className="text-sm font-medium text-green-600">
                {(user.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${user.confidence * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t pt-6 mt-6 flex space-x-3">
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Edit Profile
          </button>
        )}
        
        {onDelete && (
          <button
            onClick={onDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
