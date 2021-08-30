import React from 'react';
import { Row } from 'react-bootstrap';
import { dateFormat, currentUser } from '../../Services/chat/mock-data';

export const ChatMessages = ( props ) => {
  const { messages } = props;
  const messagesEndRef = React.useRef( null );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView( { behavior: "smooth" } );
  }

  React.useEffect(() => {
    scrollToBottom();
  }, [ messages ]);

  return (
    <div className='chat-container pt-4 pb-4'>
      { messages.map( ( message, key ) => {
        const isCurrentUser = message.user.id === currentUser.id ? true : false;

        if (isCurrentUser) {
          return (
            <Row key={ key } className='g-0 mt-3 mb-2 justify-content-end'>
              <div className='chat-message my-message p-3'>
                <p className='mb-0'>{ message.message }</p>
                <p className='sub-text mb-0 float-end'>{ message.timeCreated.format( dateFormat ) }</p>
              </div>
            </Row>
          )
        } else {
          return (
            <Row key={ key } className='g-0 mb-2'>
              <div className='chat-message p-3'>
                <p className='sub-text mb-0'>{ message.user.userName }</p>
                <p className='mb-0'>{ message.message }</p>
                <p className='sub-text mb-0'>{ message.timeCreated.format( dateFormat ) }</p>
              </div>
            </Row>
          )
        } } ) }
      <div ref={ messagesEndRef } />
    </div>
  );
};
