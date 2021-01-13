import React from 'react';
import { Form } from '@unform/web';

import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>

          <Input name="user" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-Mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="/">
          <FiArrowLeft />
          Voltar para Logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
