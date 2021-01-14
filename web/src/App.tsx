import React from 'react';

import GlobalStyle from './styles/global';

import SignIn from './pages/Signin';
import SignUp from './pages/Signup';

import { AuthProvider } from './hooks/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>

      <GlobalStyle />
    </>
  );
}

export default App;
