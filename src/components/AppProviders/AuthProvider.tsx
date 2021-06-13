import React from 'react';
import API from 'src/API';

const AuthContext = React.createContext({
  isAuthenticated: API.token.isValid(),
  setAuthenticated: (state: React.SetStateAction<boolean>): void => {
    throw new Error('Invalid context');
  },
});

const AuthProvider: React.FC = ({ children }) => {
  const initial = React.useContext(AuthContext);
  const [isAuthenticated, setAuthenticated] = React.useState(initial.isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
