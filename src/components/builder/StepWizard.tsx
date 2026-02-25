'use client';

import React from 'react';
import styled from 'styled-components';
import { Check } from 'lucide-react';
import { useCVStore } from '@/store/cvStore';
import { CV_BUILDER_STEPS } from '@/lib/utils/constants';
import { media } from '@/styles/breakpoints';

const WizardContainer = styled.div`
  background: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  position: sticky;
  top: 81px; /* Header height */
  z-index: 10;
  padding: 15px 0;
  overflow-x: auto;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StepsList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: max-content;
  padding: 0 20px;
  gap: 10px;

  ${media.md} {
    gap: 0;
  }
`;

const StepItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    width: 20px;
    height: 2px;
    background: ${({ theme }) => theme.colors.borderLight};
    margin: 0 10px;
    display: none;

    ${media.md} {
      display: block;
      width: 40px;
    }
  }
`;

const StepButton = styled.button<{ $active: boolean; $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $active, $completed }) =>
    $active
      ? theme.colors.textWhite
      : $completed
      ? theme.colors.success
      : theme.colors.textLight};
  font-weight: 700;
  font-size: 1.2rem;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.backgroundAlt};
  }
`;

const StepNumber = styled.span<{ $active: boolean; $completed: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme, $active, $completed }) =>
    $active
      ? 'rgba(255,255,255,0.2)'
      : $completed
      ? theme.colors.success
      : theme.colors.border};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.textWhite : theme.colors.textWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

export const StepWizard: React.FC = () => {
  const { currentStep, setCurrentStep } = useCVStore();

  return (
    <WizardContainer>
      <StepsList>
        {CV_BUILDER_STEPS.map((step, index) => {
          // Skip 'template' step in wizard (index 0)
          if (step.id === 'template') return null;
          
          const adjustedIndex = index - 1; // 0-based for wizard display
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;

          return (
            <StepItem key={step.id}>
              <StepButton
                $active={isActive}
                $completed={isCompleted}
                onClick={() => setCurrentStep(index)}
                disabled={!isCompleted && !isActive}
              >
                <StepNumber $active={isActive} $completed={isCompleted}>
                  {isCompleted ? <Check size={12} /> : adjustedIndex + 1}
                </StepNumber>
                {step.label}
              </StepButton>
            </StepItem>
          );
        })}
      </StepsList>
    </WizardContainer>
  );
};

export default StepWizard;
