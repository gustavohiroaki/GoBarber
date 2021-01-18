import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image,
  Platform,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInIcon,
  BackToSignInButtonText,
} from './styles';

const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua Conta</Title>
            </View>
            <Form
              ref={formRef}
              onSubmit={data => {
                console.log(data);
              }}
              style={{ width: '100%' }}
            >
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Criar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignInButton
        onPress={() => {
          navigation.navigate('Signin');
        }}
      >
        <BackToSignInIcon name="arrow-left" size={20} color="#fff" />
        <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
      </BackToSignInButton>
    </>
  );
};

export default Signup;
