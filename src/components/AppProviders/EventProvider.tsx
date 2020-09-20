import React from 'react';
import API, { APIEvent } from 'src/API';

const EventContext = React.createContext(
  (event: APIEvent): void => { throw new Error('Invalid context') }
);

const EventProvider: React.FC = ({ children }) => {
  const [event, setEvent] = React.useState({} as APIEvent);

  React.useEffect(() => {
    console.log(event);
    API.handler(event)?.then(setEvent);
    API.subscriptions.forEach(fn => fn(event));
  }, [event]);

  return (
    <EventContext.Provider value={setEvent}>
      {children}
    </EventContext.Provider>
  );
};

export const useDispatch = () => React.useContext(EventContext);

export default EventProvider;