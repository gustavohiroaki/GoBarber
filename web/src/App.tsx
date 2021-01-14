import React from 'react';

import GlobalStyle from './styles/global';
import ToastContainer from './components/ToastContainer';

import SignIn from './pages/Signin';
import SignUp from './pages/Signup';

import AppProvider from './hooks';

function App() {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>

      <GlobalStyle />
    </>
  );
}

export default App;
