import React from 'react';
import { Spinner, Row } from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <Row className="justify-content-center mt-5 loading-spinner" >
      <Spinner variant="primary" animation="border" className="justify-content-center" />
    </Row>
  );
};

export const useLoadingSpinner = () => {
  const spinner = React.useMemo( () => {
    return <LoadingSpinner />;
  }, [] );
  return spinner;
};
