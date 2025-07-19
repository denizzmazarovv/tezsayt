import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';
import AdminLogin from './AdminLogin';
import SecureAdmin from './SecureAdmin';
import { Project, Language } from '../types';

interface AdminRouteProps {
  currentLanguage: Language;
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
}

const AdminRoute: React.FC<AdminRouteProps> = ({
  currentLanguage,
  projects,
  onUpdateProjects
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const isAuth = isAuthenticated();
      setAuthenticated(isAuth);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-500 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <SecureAdmin
      currentLanguage={currentLanguage}
      projects={projects}
      onUpdateProjects={onUpdateProjects}
      onLogout={handleLogout}
    />
  );
};

export default AdminRoute;