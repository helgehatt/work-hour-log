import React from "react";

type Component = React.ReactNode;

const ModalContext = React.createContext({
  showModal: (component: Component): void => { throw new Error("Invalid context"); },
  hideModal: (): void => { throw new Error("Invalid context"); }
});

const ModalProvider: React.FC = ({ children }) => {
  
  const [component, setComponent] = React.useState<Component>(null);

  return (
    <ModalContext.Provider value={{
      showModal: setComponent,
      hideModal: React.useCallback(() => setComponent(null), []),
    }}>
      {children}
      {component}
    </ModalContext.Provider>
  );
};

export const useModal = () => React.useContext(ModalContext);

export default ModalProvider;