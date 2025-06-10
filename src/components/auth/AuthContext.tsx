import React, { createContext, useState, useEffect, useContext } from 'react';
import { signIn, signOut, signUp, confirmSignUp, resetPassword, confirmResetPassword, getCurrentUser, fetchUserAttributes, updateUserAttributes } from 'aws-amplify/auth';

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

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Verificar el estado de autenticación al cargar
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        
        setUser({
          username: currentUser.username,
          email: attributes.email || currentUser.username,
          attributes: attributes
        });
        setIsAuthenticated(true);
      } catch (error) {
        // Usuario no autenticado
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  async function handleSignIn(username: string, password: string) {
    try {
      const { isSignedIn } = await signIn({ username, password });
      
      if (isSignedIn) {
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        
        setUser({
          username: currentUser.username,
          email: attributes.email || username,
          attributes: attributes
        });
        setIsAuthenticated(true);
        return currentUser;
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  async function handleSignUp(username: string, password: string, email: string) {
    try {
      const { userId } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email
          }
        }
      });
      return { username: userId };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async function handleConfirmSignUp(username: string, code: string) {
    try {
      return await confirmSignUp({ username, confirmationCode: code });
    } catch (error) {
      console.error('Error confirming sign up:', error);
      throw error;
    }
  }

  async function handleForgotPassword(username: string) {
    try {
      return await resetPassword({ username });
    } catch (error) {
      console.error('Error in forgot password:', error);
      throw error;
    }
  }

  async function handleForgotPasswordSubmit(username: string, code: string, newPassword: string) {
    try {
      return await confirmResetPassword({ username, confirmationCode: code, newPassword });
    } catch (error) {
      console.error('Error submitting new password:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        signIn: handleSignIn, 
        signOut: handleSignOut, 
        signUp: handleSignUp, 
        confirmSignUp: handleConfirmSignUp, 
        forgotPassword: handleForgotPassword, 
        forgotPasswordSubmit: handleForgotPasswordSubmit, 
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