'use client';

import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useLetter } from '@/hooks/useLetter';
import { Button } from '@/components/shared';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-top: 30px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding-bottom: 10px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'auto')};
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 1.4rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  min-height: 300px;
  font-family: inherit;
  resize: vertical;
`;

export const LetterEditor: React.FC = () => {
  const { currentLetter, updatePersonalInfo, updateRecipientInfo, updateContent, saveLetter } = useLetter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...currentLetter?.personalInfo,
      recName: currentLetter?.recipientInfo.name,
      recTitle: currentLetter?.recipientInfo.title,
      recCompany: currentLetter?.recipientInfo.company,
      body: currentLetter?.content.body,
    }
  });

  const onSubmit = (data: any) => {
    updatePersonalInfo({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    });
    updateRecipientInfo({
      name: data.recName,
      title: data.recTitle,
      company: data.recCompany,
    });
    updateContent({
      body: data.body,
    });
    saveLetter();
  };

  if (!currentLetter) return null;

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionTitle>Your Details</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>First Name</Label>
            <Input {...register('firstName')} />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input {...register('lastName')} />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input {...register('email')} />
          </FormGroup>
          <FormGroup>
            <Label>Phone</Label>
            <Input {...register('phone')} />
          </FormGroup>
        </FormGrid>

        <SectionTitle>Recipient Details</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>Hiring Manager Name</Label>
            <Input {...register('recName')} placeholder="e.g. John Doe" />
          </FormGroup>
          <FormGroup>
            <Label>Job Title</Label>
            <Input {...register('recTitle')} placeholder="e.g. HR Manager" />
          </FormGroup>
          <FormGroup $fullWidth>
            <Label>Company Name</Label>
            <Input {...register('recCompany')} placeholder="e.g. Acme Corp" />
          </FormGroup>
        </FormGrid>

        <SectionTitle>Letter Content</SectionTitle>
        <FormGroup $fullWidth>
          <TextArea 
            {...register('body')} 
            placeholder="Dear [Name], I am writing to express my interest..."
          />
        </FormGroup>

        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="primary">
            Save & Preview
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default LetterEditor;
