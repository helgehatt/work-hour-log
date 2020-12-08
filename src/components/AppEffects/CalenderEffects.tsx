import React from 'react';
import API from 'src/API';
import { useCalender } from 'src/components/AppProviders/CalenderProvider';
import { useDispatch } from 'src/components/AppProviders/EventProvider';

const CalenderEffects: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { hours, month, addHours } = useCalender();

  React.useEffect(() => {
    const fn = API.subscriptions.add(event => {
      switch (event.type) {
        case API.constants.auth.AUTH_LOGIN_SUCCESS:
        case API.constants.auth.AUTH_REFRESH_SUCCESS:
        case API.constants.hours.HOURS_CREATE_SUCCESS:
        case API.constants.hours.HOURS_DELETE_SUCCESS:
        case API.constants.hours.HOURS_UPDATE_SUCCESS:
          dispatch(API.actions.hours.read({ month }));
      }
    });
    return () => API.subscriptions.remove(fn);
  }, [dispatch, month]);

  React.useEffect(() => {
    const fn = API.subscriptions.add(event => {
      switch (event.type) {
        case API.constants.hours.HOURS_READ_SUCCESS:
          addHours(event.request.month, event.response);
      }
    });
    return () => API.subscriptions.remove(fn);
  }, [addHours]);

  React.useEffect(() => {
    if (API.token.isValid() && hours[month] == null) {
      dispatch(API.actions.hours.read({ month }));
    }
  }, [dispatch, hours, month]);

  return <>{children}</>;
};

export default CalenderEffects;
