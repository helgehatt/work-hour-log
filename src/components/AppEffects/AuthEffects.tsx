import React from 'react';
import API from 'src/API';
import { useAuth } from 'src/components/AppProviders/AuthProvider';
import { useDispatch } from 'src/components/AppProviders/EventProvider';

const AuthEffects: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { setAuthenticated } = useAuth();

  React.useEffect(() => {
    const fn = API.subscriptions.add(event => {
      switch (event.type) {
        case API.constants.auth.AUTH_LOGIN_SUCCESS:
        case API.constants.auth.AUTH_REFRESH_SUCCESS:
          API.token.set(event.payload.token);
          setAuthenticated(true);
      }
    });
    return () => API.subscriptions.remove(fn);
  }, [setAuthenticated]);

  React.useEffect(() => {
    const fn = API.subscriptions.add(event => {
      switch (event.type) {
        case API.constants.auth.AUTH_LOGOUT_SUCCESS:
        case API.constants.auth.AUTH_LOGOUT_FAILURE:
          API.token.remove();
          setAuthenticated(false);
      }
    });
    return () => API.subscriptions.remove(fn);
  }, [setAuthenticated]);

  React.useEffect(() => {
    if (API.token.get() != null && !API.token.isValid()) {
      dispatch(API.actions.auth.refresh({}));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthEffects;
