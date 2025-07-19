import Cookies from 'js-cookie';

const SESSION_KEY = 'wl_admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface AuthCredentials {
  username: string;
  password: string;
}

// Simple hash function for demo purposes (in production, use proper server-side authentication)
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

export const authenticateAdmin = async (credentials: AuthCredentials): Promise<boolean> => {
  try {
    const { username, password } = credentials;
    
    // Get credentials from environment
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    console.log('Environment check:', { adminUsername, adminPassword }); // Debug log
    
    if (!adminUsername || !adminPassword) {
      console.error('Admin credentials not configured');
      return false;
    }
    
    // Simple validation (in production, use proper server-side authentication)
    if (username === adminUsername && password === adminPassword) {
      // Create session
      const sessionData = {
        authenticated: true,
        timestamp: Date.now(),
        expires: Date.now() + SESSION_DURATION,
        user: username
      };
      
      Cookies.set(SESSION_KEY, JSON.stringify(sessionData), {
        expires: 1, // 1 day
        secure: false, // Set to true in production with HTTPS
        sameSite: 'strict'
      });
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
};

export const isAuthenticated = (): boolean => {
  try {
    const sessionCookie = Cookies.get(SESSION_KEY);
    
    if (!sessionCookie) {
      return false;
    }
    
    const sessionData = JSON.parse(sessionCookie);
    
    // Check if session is expired
    if (Date.now() > sessionData.expires) {
      logout();
      return false;
    }
    
    return sessionData.authenticated === true;
  } catch (error) {
    console.error('Session validation error:', error);
    logout();
    return false;
  }
};

export const logout = (): void => {
  Cookies.remove(SESSION_KEY);
};

export const refreshSession = (): void => {
  if (isAuthenticated()) {
    const sessionCookie = Cookies.get(SESSION_KEY);
    if (sessionCookie) {
      const sessionData = JSON.parse(sessionCookie);
      const newSessionData = {
        ...sessionData,
        timestamp: Date.now(),
        expires: Date.now() + SESSION_DURATION
      };
      
      Cookies.set(SESSION_KEY, JSON.stringify(newSessionData), {
        expires: 1,
        secure: false,
        sameSite: 'strict'
      });
    }
  }
};