import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4 z-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          <span className="text-blue-400">✨</span> Created with ❤️ by{' '}
          <span className="font-semibold text-blue-400">Nagesh Jaunjal</span>
          <span className="text-blue-400"> ✨</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Face Recognition System - Advanced AI-powered user management
        </p>
      </div>
    </footer>
  );
};

export default Footer;
