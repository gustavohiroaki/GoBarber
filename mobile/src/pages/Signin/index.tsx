import React from 'react';
import { View, Image } from 'react-native';

import logoImg from '../../assets/logo.png';

import { Container, Title } from './styles';

const Signin: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />

      <Title>Faça seu Logon</Title>
    </Container>
  );
};

export default Signin;
