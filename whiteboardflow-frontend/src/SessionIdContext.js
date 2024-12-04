import { createContext, useContext, useState } from 'react';

const SessionIdContext = createContext();

export const useSessionId = () => useContext(SessionIdContext);

export const SessionIdProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(0);

  return (
    <SessionIdContext.Provider value={{ sessionId, setSessionId}}>
      {children}
    </SessionIdContext.Provider>
  );
};