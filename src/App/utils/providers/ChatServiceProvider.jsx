import React, { useContext } from 'react';
import { ChatServiceContext } from '../../Services/chat/chat';
import { ApiContext } from '../../Services/api-context';

export const ChatServiceProvider = ( props ) => {
  const api = useContext( ApiContext );
  const chatService = new props.useClass( api );

  return (
    <ChatServiceContext.Provider value={ chatService }>
      { props.children }
    </ChatServiceContext.Provider>
  );
};
