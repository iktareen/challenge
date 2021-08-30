import React from 'react';
import { ChatServiceContext } from './chat';
import { mockedChatData } from './mock-data';

export const sleep = ( ms ) => new Promise( ( resolve ) => setTimeout( resolve, ms ) );

export class MockedChatService {
  messages;
  /**
   * Newly chat message will get this id in this mocked service
   */
  nextChatMessageId = 0;

  constructor() {
    this.messages = mockedChatData;
    this.calculateNextIdsForService();
  }

  calculateNextIdsForService() {
    const messageIds = this.messages.map( ( t ) => t.id );
    this.nextMessageId = Math.max( ...messageIds ) + 1;
  }

  getAllMessages() {
    return sleep ( 500 )
      .then( () => {
        this.messages = this.messages.sort(( a,b ) => new Date( a[ 'timeCreated' ] ) - new Date( b[ 'timeCreated' ] ) );
        return this.messages;
      } );
  }

  postMessage( newMessage ) {
    newMessage.id = this.nextMessageId;
    this.nextMessageId += 1;
    this.messages.push( newMessage );

    const message = sleep( 500 ).then( () => {
      return newMessage;
    } );
    
    return message;
  }
}

export const MockedChatServiceProvider = ( props ) => {
  const service = new MockedChatService();

  return (
    <ChatServiceContext.Provider value={ service }>
      { props.children }
    </ChatServiceContext.Provider>
  );
};
