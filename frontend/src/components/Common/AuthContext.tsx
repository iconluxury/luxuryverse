import { createContext, useState, ReactNode } from 'react'; // Ensure useState is imported

// Define the shape of the context value
interface AuthContextType {
  user: { id: string; email: string } | null;
  isJoining: boolean;
  login: (userData: { id: string; email: string }) => void;
  logout: () => void;
  setJoining: (isJoining: boolean) => void;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isJoining: false,
  login: () => {},
  logout: () => {},
  setJoining: () => {},
});

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  const login = (userData: { id: string; email: string }) => {
    setUser(userData);
    setIsJoining(false);
  };

  const logout = () => {
    setUser(null);
    setIsJoining(false);
    localStorage.removeItem('access_token');
  };

  const value: AuthContextType = {
    user,
    isJoining,
    login,
    logout,
    setJoining: (value: boolean) => setIsJoining(value),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}