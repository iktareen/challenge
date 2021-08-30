import React from 'react';
import { BaseApiError } from "./base";
import axios from 'axios';
import { ApiContext } from "./api-context";

// Ideally to set it up on ENV
export const publicApiUrl = 'https://chatty.kubernetes.doodle-test.com/api';

export class AxiosApi {
  api;

  constructor( config ) {
    this.api = axios.create( config );
  }

  request ( request ) {
    const requestDescriptor = { ...request.descriptor };
    let preRequestPromise = Promise.resolve( requestDescriptor );

    const requestPromise = preRequestPromise
      .then( ( requestConfig ) => {
        return this.api.request( requestConfig );
      } );

    const responsePromise = requestPromise
      .then( ( response ) => {
        // Here we don't do anything with response but we can on very top/root level
        return response.data;
      } )
      .catch( ( error ) => {
        if ( error.response ) {
          // The request was made and the server responded with a status code
          const response = error.response;
          if ( response.status === 400 ) {
            const apiError = new BaseApiError( response.data, true );
            return Promise.reject( apiError );
          }
        } else if ( error.request ) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          const apiError = new BaseApiError( error, false );
          return Promise.reject( apiError );
        } else {
          // Something happened in setting up the request that triggered an Error
          const apiError = new BaseApiError( error, false );
          return Promise.reject( apiError );
        }

        const apiError = new BaseApiError( error, false );
        console.log( 'Api layer didn\'t handle error', apiError );
        return Promise.reject( apiError );
      } );

    return responsePromise;
  }
}

// Implementation of API
export class AppApi extends AxiosApi {
  constructor() {
    super( {
      baseURL: publicApiUrl,
    } );
  }
}

export const ApiProvider = ( props ) => {
  const api = new AppApi();

  return (
    <ApiContext.Provider value={ api }>
      { props.children }
    </ApiContext.Provider>
  );
};
