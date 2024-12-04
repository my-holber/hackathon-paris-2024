import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    isConnected: boolean;
    login: (userToken: string) => Promise<void>;
    logout: () => Promise<void>;
    token: string | null;
    loading: boolean;
}
interface AuthProviderProps {
    children: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé `useAuth`
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);
  
    const login = async (userToken: string): Promise<void> => {
      try {
        await AsyncStorage.setItem('userToken', userToken);
        setToken(userToken);
        setIsConnected(true);
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
      }
    };
  
    const logout = async (): Promise<void> => {
      try {
        await AsyncStorage.removeItem('userToken');
        setToken(null);
        setIsConnected(false);
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    };
  
    const autoLogin = async (): Promise<void> => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du token:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      autoLogin();
    }, []);
  
    return (
      <AuthContext.Provider value={{ isConnected, login, logout, token, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };