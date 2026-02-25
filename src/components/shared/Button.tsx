'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/breakpoints';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  target?: '_blank' | '_self';
}

const baseButtonStyles = css`
  display: inline-block;
  text-align: center;
  font-weight: 800;
  font-family: ${({ theme }) => theme.fonts.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  cursor: pointer;
  transition-duration: ${({ theme }) => theme.transitions.button};
  text-decoration: none;
  border: none;
  outline: none;

  &:disabled {
    pointer-events: none;
    opacity: 0.4;
  }
`;

const sizeStyles = {
  small: css`
    font-size: 1.4rem;
    line-height: 1.8rem;
    padding: 10px 20px;
    min-width: 120px;
  `,
  medium: css`
    font-size: 1.8rem;
    line-height: 2rem;
    padding: 12px 24px;
    min-width: 200px;

    ${media.xs} {
      min-width: 250px;
    }
  `,
  large: css`
    font-size: 2rem;
    line-height: 2.2rem;
    padding: 14px 28px;
    min-width: 100%;

    ${media.xs} {
      min-width: 300px;
    }
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textWhite};

    ${media.md} {
      &:hover {
        transform: translate(0, -7px);
        transition-duration: 0.5s;
        box-shadow: 0 8px 0 ${({ theme }) => theme.colors.accentDark};
      }
    }
  `,
  secondary: css`
    background-color: #cad5e2;
    color: ${({ theme }) => theme.colors.primary};

    ${media.md} {
      &:hover {
        transform: translate(0, -7px);
        transition-duration: 0.5s;
        box-shadow: 0 8px 0 ${({ theme }) => theme.colors.primary};
      }
    }
  `,
  outline: css`
    background-color: transparent;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};

    ${media.md} {
      &:hover {
        transform: translate(0, -7px);
        transition-duration: 0.5s;
        box-shadow: 0 8px 0 ${({ theme }) => theme.colors.primary};
      }
    }
  `,
  link: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    padding: 0;
    min-width: auto;

    &:hover {
      text-decoration: none;
    }
  `,
};

interface StyledButtonProps {
  $variant: 'primary' | 'secondary' | 'outline' | 'link';
  $size: 'small' | 'medium' | 'large';
  $fullWidth: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  ${baseButtonStyles}
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
      min-width: 100%;
    `}
`;

const StyledLink = styled(Link)<StyledButtonProps>`
  ${baseButtonStyles}
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
      min-width: 100%;
    `}
`;

const StyledExternalLink = styled.a<StyledButtonProps>`
  ${baseButtonStyles}
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
      min-width: 100%;
    `}
`;

const ButtonWrapper = styled.div<{ $variant: string }>`
  display: inline-block;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  fullWidth = false,
  children,
  href,
  onClick,
  disabled = false,
  className,
  title,
  type = 'button',
  target = '_self',
}) => {
  const styleProps = {
    $variant: variant,
    $size: size,
    $fullWidth: fullWidth,
  };

  // External link
  if (href && target === '_blank') {
    return (
      <ButtonWrapper $variant={variant} className={className}>
        <StyledExternalLink
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={title}
          {...styleProps}
        >
          {children}
        </StyledExternalLink>
      </ButtonWrapper>
    );
  }

  // Internal link
  if (href) {
    return (
      <ButtonWrapper $variant={variant} className={className}>
        <StyledLink href={href} title={title} {...styleProps}>
          {children}
        </StyledLink>
      </ButtonWrapper>
    );
  }

  // Button
  return (
    <ButtonWrapper $variant={variant} className={className}>
      <StyledButton
        type={type}
        onClick={onClick}
        disabled={disabled}
        title={title}
        {...styleProps}
      >
        {children}
      </StyledButton>
    </ButtonWrapper>
  );
};

export default Button;
