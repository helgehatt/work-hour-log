import React from 'react';
import AuthEffects from './AuthEffects';
import ModalEffects from './ModalEffects';
import CalendarEffects from './CalendarEffects';

const AppEffects: React.FC = ({ children }) => {
  return (
    <AuthEffects>
      <ModalEffects>
        <CalendarEffects>{children}</CalendarEffects>
      </ModalEffects>
    </AuthEffects>
  );
};

export default AppEffects;
