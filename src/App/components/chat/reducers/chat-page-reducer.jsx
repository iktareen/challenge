export const reducerChatLayout = ( prevState, action ) => {
  switch ( action.type ) {
    case 'LOAD_CHAT_STARTED': {
      const nextState = {
        ...prevState,
        isLoading: true,
      };
      return nextState;
    }
    case 'LOAD_CHAT_SUCCESS': {
      const payload = action.payload;
      return {
        ...prevState,
        isLoading: false,
        messages: payload.messages,
      };
    }
    case 'UPDATE_CHAT': {
      const payload = action.payload;
      return {
        ...prevState,
        messages: payload.messages,
      };
    }
    case 'LOAD_CHAT_ERROR': {
      return {
        ...prevState,
        isLoading: false,
      };
    }
    default:
      return prevState;
  }
};
