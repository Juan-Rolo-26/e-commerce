import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/users/me/', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setUser(data);
      })
      .catch(() => {});
  }, []);

  const signup = async (username, password, role = 'customer') => {
    const res = await fetch('/api/auth/signup/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password, role }),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
      return data;
    }
    throw new Error('Signup failed');
  };

  const login = async (username, password) => {
    const res = await fetch('/api/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
      return data;
    }
    throw new Error('Login failed');
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};
