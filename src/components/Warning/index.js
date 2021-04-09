import React from 'react';

import { Container } from './styles';

const Warning = ({ title, className = '', children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Warning;
