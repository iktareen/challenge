import React from 'react';
import { Col, Button, Form } from 'react-bootstrap';

// I am using formik for input field and yup for validation
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object( {
  message: yup
    .string()
    .required(),
} ).defined();

export const MessageForm = ( props ) => {
  const formikConfig = React.useMemo( () => {
    return {
      initialValues: props.initialValue,
      validateOnBlur: false,
      validateOnChange: true,
      validateOnMount: true,
      validationSchema: validationSchema,
      onSubmit: ( values, formikActions ) => {
        return props.onSubmit( values, formikActions );
      },
    };
  }, [ props ] );

  const formik = useFormik( formikConfig );
  const { handleChange, handleSubmit, values, isSubmitting } = formik;

  const handleKeyboardEvent = ( e ) => {
    if ( !isSubmitting ) {
      if ( e.keyCode === 13 && !e.shiftKey ) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  return (
    <div className='message-form'>
      <Col className='chat-container'>
        <Form
          onSubmit={ handleSubmit }
          onKeyDown={ handleKeyboardEvent }
          id='message-form'
        >
          <Form.Group className='d-flex'>
            <Form.Control
              id='submit-message'
              name='message'
              type='text'
              value={ values.message }
              onChange={ handleChange }
              placeholder='Message'
            />
            <Button
              type='submit'
              className='submit-button submit-button'
              id='add-message-button'
              disabled={ isSubmitting }
              >
                Send
              </Button>
            </Form.Group>
        </Form>
      </Col>
    </div>
  );
};
