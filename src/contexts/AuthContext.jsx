import React, {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  getAccessToken, getUserLogged, putAccessToken,
} from '../utils/network-data';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const token = getAccessToken();
      if (token) {
        const { error, data } = await getUserLogged();
        if (!error && data) {
          setUser(data);
        } else {
          putAccessToken('');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    }

    initAuth();
  }, []);

  const login = useCallback(async (token) => {
    putAccessToken(token);
    const { error, data } = await getUserLogged();
    if (!error && data) {
      setUser(data);
      return true;
    }
    putAccessToken('');
    setUser(null);
    return false;
  }, []);

  const logout = useCallback(() => {
    putAccessToken('');
    setUser(null);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
  }), [user, isLoading, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
