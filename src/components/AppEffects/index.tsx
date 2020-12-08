import React from 'react';
import AuthEffects from './AuthEffects';
import ModalEffects from './ModalEffects';
import CalenderEffects from './CalenderEffects';

const AppEffects: React.FC = ({ children }) => {
  return (
    <AuthEffects>
      <ModalEffects>
        <CalenderEffects>{children}</CalenderEffects>
      </ModalEffects>
    </AuthEffects>
  );
};

export default AppEffects;
