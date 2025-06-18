import React from 'react';
import { TodoContextProvider } from './context/useTodoContext';
import { AppContent } from './components/AppContent';

export const App: React.FC = () => {
  return (
    <TodoContextProvider>
      <AppContent />
    </TodoContextProvider>
  );
};
