import { BaseRequest } from "../base";
import React from "react";

export class ChatService {
  api;
  constructor( api ) {
    this.api = api;
  }

  getAllMessages() {
    return this.api.request( new ListAllMessagesRequest() )
      .then( ( response ) => {
        return response;
      } );
  }

  postMessage( newMessage ) {
    return this.api.request( new PostMessageRequest( newMessage ) )
      .then( ( response ) => {
        return response;
      } );
  }
}

export class ListAllMessagesRequest extends BaseRequest {
  constructor() {
    super( {
      method: 'GET',
      url: '/chatty/v1.0',
      responseType: 'json',
    } );
  }
}

export class PostMessageRequest extends BaseRequest {
  constructor(
    message,
  ) {
    super( {
      method: 'POST',
      url: '/chatty/v1.0',
      data: message,
      responseType: 'json',
    } );
  }
}

export const ChatServiceContext = React.createContext( undefined );

export const useChatService = () => {
  return React.useContext( ChatServiceContext );
};