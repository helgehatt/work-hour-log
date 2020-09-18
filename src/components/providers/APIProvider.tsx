import React from 'react';
import { ActionType, handlers } from 'src/API';

const EventContext = React.createContext({} as ActionType);
const DispatchContext = React.createContext((event: ActionType): void => { throw new Error('Invalid context') });

const APIProvider: React.FC = ({ children }) => {
  const [event, setEvent] = React.useState({} as ActionType);

  React.useEffect(() => {
    console.log(event);
    // TODO: Fix types
    (handlers.auth(event as any) as any)?.then(setEvent);
    (handlers.hours(event as any) as any)?.then(setEvent);
  }, [event]);

  return (
    <DispatchContext.Provider value={setEvent}>
      <EventContext.Provider value={event}>
        {children}
      </EventContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAPIEvent = () => React.useContext(EventContext);
export const useAPIDispatch = () => React.useContext(DispatchContext);

export { 
  actions as APIActions,
  constants as APIConstants,
  token as APIToken,
} from 'src/API';

export default APIProvider;