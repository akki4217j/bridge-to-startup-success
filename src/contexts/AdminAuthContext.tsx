
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  lastLogin: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  currentAdmin: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

// Mock admin users - in production, this would come from a secure backend
const ADMIN_USERS = [
  {
    id: 1,
    email: 'admin@startupbridge.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const
  },
  {
    id: 2,
    email: 'super@startupbridge.com',
    password: 'super123',
    name: 'Super Admin',
    role: 'super_admin' as const
  }
];

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(null);

  // Session timeout (15 minutes)
  const SESSION_DURATION = 15 * 60 * 1000;

  const clearSession = () => {
    setIsAuthenticated(false);
    setCurrentAdmin(null);
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_user');
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      setSessionTimeout(null);
    }
  };

  const setSessionTimer = () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
    const timer = setTimeout(() => {
      clearSession();
    }, SESSION_DURATION);
    setSessionTimeout(timer);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const admin = ADMIN_USERS.find(user => user.email === email && user.password === password);
    
    if (admin) {
      const adminUser: AdminUser = {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        lastLogin: new Date().toISOString()
      };
      
      setIsAuthenticated(true);
      setCurrentAdmin(adminUser);
      localStorage.setItem('admin_session', 'active');
      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      setSessionTimer();
      return true;
    }
    
    return false;
  };

  const logout = () => {
    clearSession();
  };

  const checkSession = (): boolean => {
    const session = localStorage.getItem('admin_session');
    const userString = localStorage.getItem('admin_user');
    
    if (session === 'active' && userString) {
      try {
        const user = JSON.parse(userString);
        setCurrentAdmin(user);
        setIsAuthenticated(true);
        setSessionTimer();
        return true;
      } catch {
        clearSession();
        return false;
      }
    }
    
    clearSession();
    return false;
  };

  useEffect(() => {
    checkSession();
    
    return () => {
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  }, []);

  return (
    <AdminAuthContext.Provider value={{
      isAuthenticated,
      currentAdmin,
      login,
      logout,
      checkSession
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
