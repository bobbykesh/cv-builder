'use client';

import React from 'react';
import styled from 'styled-components';
import { Button } from '@/components/shared';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const Title = styled.h1`
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.6rem;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.textLight};
`;

export default function NotFound() {
  return (
    <Container>
      <Title>404</Title>
      <Message>Page not found</Message>
      <Button href="/" variant="primary">
        Go Home
      </Button>
    </Container>
  );
}
