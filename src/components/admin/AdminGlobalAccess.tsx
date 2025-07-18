
import React, { useState, useEffect } from 'react';
import AdminLoginModal from '../auth/AdminLoginModal';

const AdminGlobalAccess: React.FC = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Shift + Alt + A for admin access
      if (e.shiftKey && e.altKey && e.key === 'A') {
        e.preventDefault();
        setShowAdminLogin(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <AdminLoginModal 
      isOpen={showAdminLogin} 
      onClose={() => setShowAdminLogin(false)} 
    />
  );
};

export default AdminGlobalAccess;
