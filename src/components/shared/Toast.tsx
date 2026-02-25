'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { media } from '@/styles/breakpoints';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: calc(100vw - 40px);

  ${media.md} {
    max-width: 400px;
  }
`;

const ToastItem = styled.div<{ $type: 'success' | 'error' | 'warning' | 'info' }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${slideIn} 0.3s ease;
  border-left: 4px solid
    ${({ theme, $type }) => {
      switch ($type) {
        case 'success':
          return theme.colors.success;
        case 'error':
          return theme.colors.error;
        case 'warning':
          return theme.colors.warning;
        case 'info':
          return theme.colors.info;
        default:
          return theme.colors.info;
      }
    }};
`;

const IconWrapper = styled.div<{ $type: 'success' | 'error' | 'warning' | 'info' }>`
  flex-shrink: 0;
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.info;
    }
  }};
`;

const Message = styled.p`
  flex: 1;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLight};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const getIcon = (type: 'success' | 'error' | 'warning' | 'info') => {
  switch (type) {
    case 'success':
      return <CheckCircle size={20} />;
    case 'error':
      return <AlertCircle size={20} />;
    case 'warning':
      return <AlertTriangle size={20} />;
    case 'info':
      return <Info size={20} />;
    default:
      return <Info size={20} />;
  }
};

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} $type={toast.type}>
          <IconWrapper $type={toast.type}>{getIcon(toast.type)}</IconWrapper>
          <Message>{toast.message}</Message>
          <CloseButton onClick={() => removeToast(toast.id)} aria-label="Close">
            <X size={16} />
          </CloseButton>
        </ToastItem>
      ))}
    </ToastContainer>
  );
};

export default Toast;
