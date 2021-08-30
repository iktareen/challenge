import React from 'react';

export const ApiContext = React.createContext( undefined );
export const MockedApiContext = React.createContext( undefined );

export const useAppApi = () => {
  const api = React.useContext( ApiContext );
  return api;
};
