'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { Sparkles } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  icon?: boolean;
  className?: string;
}

const sizeStyles = {
  small: css`
    font-size: 1rem;
    padding: 4px 10px;
  `,
  medium: css`
    font-size: 1.2rem;
    padding: 7px 18px;
  `,
  large: css`
    font-size: 1.4rem;
    padding: 10px 24px;
  `,
};

const variantStyles = {
  default: css`
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.text};
  `,
  gradient: css`
    position: relative;
    color: ${({ theme }) => theme.colors.primaryDark};
    background: linear-gradient(120deg, #ff8873, #efc778, #6bb6c2, #0058ac);

    &::after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.colors.background};
      height: calc(100% - 3px);
      width: calc(100% - 3px);
      border-radius: inherit;
      inset: 50% auto auto 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.textWhite};
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.textWhite};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.textWhite};
  `,
};

const BadgeWrapper = styled.span<{
  $variant: 'default' | 'gradient' | 'success' | 'warning' | 'error';
  $size: 'small' | 'medium' | 'large';
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 68px;
  font-weight: 700;
  line-height: 1;
  z-index: 1;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  icon = false,
  className,
}) => {
  return (
    <BadgeWrapper $variant={variant} $size={size} className={className}>
      {icon && <Sparkles size={14} />}
      {children}
    </BadgeWrapper>
  );
};

export default Badge;
