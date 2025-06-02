import React, { createContext, useState, useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }

  async function signIn(username: string, password: string) {
    try {
      const user = await Auth.signIn(username, password);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  async function signUp(username: string, password: string, email: string) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: { email }
      });
      return user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async function confirmSignUp(username: string, code: string) {
    try {
      return await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.error('Error confirming sign up:', error);
      throw error;
    }
  }

  async function forgotPassword(username: string) {
    try {
      return await Auth.forgotPassword(username);
    } catch (error) {
      console.error('Error in forgot password:', error);
      throw error;
    }
  }

  async function forgotPasswordSubmit(username: string, code: string, newPassword: string) {
    try {
      return await Auth.forgotPasswordSubmit(username, code, newPassword);
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
