'use client';

import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCV } from '@/hooks/useCV';
import { personalInfoSchema, PersonalInfoFormData } from '@/lib/utils/validators';
import { Button } from '@/components/shared';
import { media } from '@/styles/breakpoints';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.primary};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  ${media.sm} {
    grid-template-columns: 1fr 1fr;
  }
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
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 1.6rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.2rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

export const PersonalInfoForm: React.FC = () => {
  const { currentCV, updatePersonalInfo, nextStep } = useCV();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: currentCV?.personalInfo,
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    updatePersonalInfo(data);
    nextStep();
  };

  return (
    <FormContainer>
      <Title>What's the best way for employers to contact you?</Title>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGrid>
          <FormGroup>
            <Label>First Name</Label>
            <Input {...register('firstName')} placeholder="e.g. Jessica" />
            {errors.firstName && <ErrorText>{errors.firstName.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Last Name</Label>
            <Input {...register('lastName')} placeholder="e.g. Smith" />
            {errors.lastName && <ErrorText>{errors.lastName.message}</ErrorText>}
          </FormGroup>

          <FormGroup $fullWidth>
            <Label>Profession / Job Title</Label>
            <Input {...register('jobTitle')} placeholder="e.g. Software Engineer" />
            {errors.jobTitle && <ErrorText>{errors.jobTitle.message}</ErrorText>}
          </FormGroup>

          <FormGroup $fullWidth>
            <Label>Email</Label>
            <Input {...register('email')} type="email" placeholder="e.g. jessica.smith@example.com" />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Phone</Label>
            <Input {...register('phone')} placeholder="e.g. +44 7700 900000" />
            {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>City</Label>
            <Input {...register('city')} placeholder="e.g. London" />
            {errors.city && <ErrorText>{errors.city.message}</ErrorText>}
          </FormGroup>

          <FormGroup $fullWidth>
            <Label>Address</Label>
            <Input {...register('address')} placeholder="e.g. 123 High Street" />
            {errors.address && <ErrorText>{errors.address.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Postcode</Label>
            <Input {...register('postcode')} placeholder="e.g. SW1A 1AA" />
            {errors.postcode && <ErrorText>{errors.postcode.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Country</Label>
            <Input {...register('country')} placeholder="e.g. United Kingdom" />
            {errors.country && <ErrorText>{errors.country.message}</ErrorText>}
          </FormGroup>
        </FormGrid>

        <ButtonRow>
          <Button type="submit" variant="primary" size="medium">
            Next: Experience
          </Button>
        </ButtonRow>
      </form>
    </FormContainer>
  );
};

export default PersonalInfoForm;
