'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullScreen?: boolean;
  text?: string;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const sizeMap = {
  small: '20px',
  medium: '40px',
  large: '60px',
};

const borderSizeMap = {
  small: '2px',
  medium: '4px',
  large: '5px',
};

const FullScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: ${({ theme }) => theme.zIndex.modal};
  gap: 20px;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Spinner = styled.div<{ $size: string; $borderSize: string; $color: string }>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border: ${({ $borderSize }) => $borderSize} solid ${({ theme }) => theme.colors.borderLight};
  border-top-color: ${({ $color }) => $color};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
`;

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color,
  fullScreen = false,
  text,
}) => {
  const spinnerSize = sizeMap[size];
  const borderSize = borderSizeMap[size];
  const spinnerColor = color || '#02818c';

  const spinner = (
    <SpinnerWrapper>
      <Spinner $size={spinnerSize} $borderSize={borderSize} $color={spinnerColor} />
      {text && <LoadingText>{text}</LoadingText>}
    </SpinnerWrapper>
  );

  if (fullScreen) {
    return <FullScreenWrapper>{spinner}</FullScreenWrapper>;
  }

  return spinner;
};

export default LoadingSpinner;
