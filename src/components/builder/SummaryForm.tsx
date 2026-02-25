'use client';

import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useCV } from '@/hooks/useCV';
import { Button } from '@/components/shared';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  min-height: 200px;
  font-family: inherit;
  font-size: 1.6rem;
  line-height: 1.6;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const SummaryForm: React.FC = () => {
  const { currentCV, updateSummary, nextStep, prevStep } = useCV();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      summary: currentCV?.summary || '',
    },
  });

  const onSubmit = (data: { summary: string }) => {
    updateSummary(data.summary);
    nextStep();
  };

  return (
    <Container>
      <Title>Professional Summary</Title>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          {...register('summary')}
          placeholder="Briefly describe your professional background, skills, and achievements..."
        />

        <ActionButtons>
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" variant="primary">
            Next: Preview
          </Button>
        </ActionButtons>
      </form>
    </Container>
  );
};

export default SummaryForm;
