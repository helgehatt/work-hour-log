import React from 'react';
import API from 'src/API';

const AuthEffects: React.FC = ({ children }) => {
  
  React.useEffect(() => {
    const fn = API.subscriptions.add(event => {
      switch (event.type) {
        case API.constants.auth.AUTH_LOGIN_SUCCESS:
          API.token.set(event.payload.token);
      }
    });
    return () => API.subscriptions.remove(fn);
  }, []);

  return (
    <>{children}</>    
  );
};

export default AuthEffects;