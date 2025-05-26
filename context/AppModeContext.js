// context/AppModeContext.js
import React, { createContext, useContext, useState } from 'react';

const AppModeContext = createContext();

export const AppModeProvider = ({ children }) => {
  const [isOffline, setIsOffline] = useState(false);

  return (
    <AppModeContext.Provider value={{ isOffline, setIsOffline }}>
      {children}
    </AppModeContext.Provider>
  );
};

export const useAppMode = () => useContext(AppModeContext);
