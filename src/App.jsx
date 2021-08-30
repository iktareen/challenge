import React, { Suspense } from 'react';
import Loader from './App/Loader';
import { Route, BrowserRouter } from 'react-router-dom';

import './assets/css/global.scss';
// Components
import { ChatLayout } from './App/components/chat/ChatLayout';

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={ <Loader /> }>
        <Route path="/" exact>
          <ChatLayout />
        </Route>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
