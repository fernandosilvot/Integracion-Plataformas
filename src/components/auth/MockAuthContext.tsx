import React, { createContext, useState, useEffect, useContext } from 'react';

interface User {
  username: string;
  email: string;
  attributes: {
    email: string;
    sub: string;
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (username: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  signUp: (username: string, password: string, email: string) => Promise<any>;
  confirmSignUp: (username: string, code: string) => Promise<any>;
  forgotPassword: (username: string) => Promise<any>;
  forgotPasswordSubmit: (username: string, code: string, newPassword: string) => Promise<any>;
  loading: boolean;
}

// Mock de usuarios para desarrollo local
const mockUsers: Record<string, { password: string; user: User }> = {
  'demo@example.com': {
    password: 'Password123',
    user: {
      username: 'demo@example.com',
      email: 'demo@example.com',
      attributes: {
        email: 'demo@example.com',
        sub: '12345-mock-user-id',
      }
    }
  },
  'admin@example.com': {
    password: 'Admin123',
    user: {
      username: 'admin@example.com',
      email: 'admin@example.com',
      attributes: {
        email: 'admin@example.com',
        sub: '67890-mock-admin-id',
      }
    }
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simular verificación de autenticación al cargar
    const checkAuth = async () => {
      try {
        // Verificar si hay un usuario en localStorage
        const savedUser = localStorage.getItem('mockAuthUser');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  async function signIn(username: string, password: string) {
    return new Promise((resolve, reject) => {
      // Simular latencia de red
      setTimeout(() => {
        const userRecord = mockUsers[username];
        
        if (userRecord && userRecord.password === password) {
          const user = userRecord.user;
          setUser(user);
          setIsAuthenticated(true);
          localStorage.setItem('mockAuthUser', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Incorrect username or password'));
        }
      }, 500);
    });
  }

  async function signOut() {
    return new Promise<void>((resolve) => {
      // Simular latencia de red
      setTimeout(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('mockAuthUser');
        resolve();
      }, 300);
    });
  }

  async function signUp(username: string, password: string, email: string) {
    return new Promise((resolve, reject) => {
      // Simular latencia de red
      setTimeout(() => {
        if (mockUsers[username]) {
          reject(new Error('User already exists'));
        } else {
          // En un entorno real, no guardaríamos usuarios así
          // Esto es solo para simular el proceso
          const newUser = {
            username,
            email,
            attributes: {
              email,
              sub: `mock-${Date.now()}`
            }
          };
          
          mockUsers[username] = {
            password,
            user: newUser
          };
          
          resolve(newUser);
        }
      }, 500);
    });
  }

  async function confirmSignUp(username: string, code: string) {
    return new Promise((resolve, reject) => {
      // Simular latencia de red
      setTimeout(() => {
        // En desarrollo local, aceptamos cualquier código
        if (code && code.length > 0) {
          resolve({ success: true });
        } else {
          reject(new Error('Invalid verification code'));
        }
      }, 500);
    });
  }

  async function forgotPassword(username: string) {
    return new Promise((resolve, reject) => {
      // Simular latencia de red
      setTimeout(() => {
        if (mockUsers[username]) {
          resolve({ success: true });
        } else {
          reject(new Error('User not found'));
        }
      }, 500);
    });
  }

  async function forgotPasswordSubmit(username: string, code: string, newPassword: string) {
    return new Promise((resolve, reject) => {
      // Simular latencia de red
      setTimeout(() => {
        if (mockUsers[username] && code && code.length > 0) {
          mockUsers[username].password = newPassword;
          resolve({ success: true });
        } else {
          reject(new Error('Invalid code or user not found'));
        }
      }, 500);
    });
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        signIn, 
        signOut, 
        signUp, 
        confirmSignUp, 
        forgotPassword, 
        forgotPasswordSubmit, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
