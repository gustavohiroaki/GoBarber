import React from 'react';
import { render } from '@testing-library/react';
import Signin from '../../pages/Signin';

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Signin', () => {
  it('should be able to signin', () => {
    const { debug } = render(<Signin />);

    debug();
  });
});
