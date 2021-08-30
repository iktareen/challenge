import React from 'react';
import { useChatService } from '../../Services/chat/chat';
import { MessageForm } from './MessageForm';
import { ChatMessages } from './ChatMessages';
import { reducerChatLayout } from './reducers/chat-page-reducer';
import { useLoadingSpinner } from '../../utils/LoadingSpinner';
import { currentUser } from '../../Services/chat/mock-data';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

const initialState = {
  messages: undefined,
  isLoading: true,
  newMessage: {
    message: '',
  },
};

const dummyPageContext = {
  fireAction: () => {},
};

export const AppPageContext = React.createContext( dummyPageContext );

export const ChatLayout = () => {
  const chatService = useChatService();
  const loadingIndicator = useLoadingSpinner();
  const [ pageState, dispatch ] = React.useReducer(reducerChatLayout, initialState );
  const pageContext = React.useMemo( () => {
    return {
      fireAction: dispatch,
    };
  }, [] );
  const { isLoading, messages, newMessage } = pageState;

  const chatActions = React.useMemo( () => {
    return {
      reload: ( newMessage ) => {
        if ( newMessage !== undefined ) {
          // set new message for whole chat layout without reloading from service layer...
          const messagesAfterMutation = cloneDeep( messages );
          const foundIndex = messagesAfterMutation.findIndex( ( f ) => f.id === newMessage.id );
          if( foundIndex !== -1 ) {
            messagesAfterMutation[foundIndex] = newMessage;
          } else {
            messagesAfterMutation.push( newMessage );
          }
          dispatch( {
            type: 'LOAD_CHAT_SUCCESS',
            payload: { messages: messagesAfterMutation },
          } );
        }
      },
    };
  }, [ messages ] );

  React.useEffect( () => {
    let isMounted = true;
    const fetchData = async () => {
      // setIsLoading( true );
      try {
        dispatch( { type: 'LOAD_CHAT_STARTED' } );
        const data = await chatService.getAllMessages();
        if ( isMounted ) {
          dispatch( {
            type: 'LOAD_CHAT_SUCCESS',
            payload: { messages: data },
          } );
        }
      } catch( e ) {
        //TODO: We can improve error handling by showing some dialog on UI
        if ( isMounted ) {
          dispatch( { type: 'LOAD_CHAT_ERROR' } );
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [ chatService ] );

  const handleAddMessage = React.useCallback(( newMessage, actions ) => {
      const createDate = moment();
      // I am introducing a fake current user to distiungish between other users
      // Normally a current user info can be taken from app auth token
      const message = {
        message: newMessage.message,
        timeCreated: createDate,
        user: {
          id: currentUser.id,
          userName: currentUser.userName,
          userEmail: currentUser.userEmail,
        },
      };
      const result = chatService.postMessage( message ).then( ( res ) => {
        if ( res ) {
          chatActions.reload(res);
          actions.resetForm( {} );
        } else {
          throw createAppFormikError( { } );
        }
      } ).catch( ( error ) => {
        //TODO: We can improve error handling by showing some dialog on UI
        // console.log(error);
      } );
      return result;
  }, [ chatService, chatActions ] );

  return (
    <AppPageContext.Provider value={ pageContext }>
      { isLoading ? loadingIndicator : (
        <div id='messages'>
          <ChatMessages messages={ messages } />
          <div className='hi-50'></div>
          <MessageForm initialValue={ newMessage } onSubmit={ handleAddMessage }/>
        </div>
      ) }
    </AppPageContext.Provider>
  );
};

export const createAppFormikError = ( errors ) => {
  return {
    type: 'AppFormikError',
    errors: errors,
  };
};