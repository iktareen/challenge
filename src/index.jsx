import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApiProvider } from './App/Services/api';
import { ChatService } from './App/Services/chat/chat';
import { MockedChatServiceProvider } from './App/Services/chat/mock-service';

// MockedChatServiceProvider is a provider to provide mocked chat service, as i don't recieved a token key to access
// the endpoint, therefore i introduced mocked chat service.
// To use real api, replace MockedChatServiceProvider with ChatServiceProvider

const app = (
  <ApiProvider>
    <MockedChatServiceProvider useClass={ ChatService }>
      <App />                  
    </MockedChatServiceProvider>
  </ApiProvider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
