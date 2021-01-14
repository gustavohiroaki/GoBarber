import React from 'react';

import GlobalStyle from './styles/global';

import SignIn from './pages/Signin';
import SignUp from './pages/Signup';

import AuthContext from './context/AuthContext';

function App() {
  return (
    <>
      <AuthContext.Provider value={{ name: 'Gustavo' }}>
        <SignIn />
        <GlobalStyle />
      </AuthContext.Provider>
    </>
  );
}

export default App;
