'use client';

import React from 'react';
import styled from 'styled-components';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useCV } from '@/hooks/useCV';
import { Button } from '@/components/shared';
import { experienceSchema, ExperienceFormData } from '@/lib/utils/validators';
import { z } from 'zod';

// Schema for multiple items
const experiencesSchema = z.object({
  items: z.array(experienceSchema),
});

type ExperiencesFormData = z.infer<typeof experiencesSchema>;

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

const Subtitle = styled.p`
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.textLight};
`;

const ItemCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const RemoveButton = styled.button`
  color: ${({ theme }) => theme.colors.error};
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1.2rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 1.4rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
`;

const Col = styled.div`
  flex: 1;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const ExperienceForm: React.FC = () => {
  const { currentCV, updateCurrentCV, nextStep, prevStep } = useCV();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperiencesFormData>({
    resolver: zodResolver(experiencesSchema),
    defaultValues: {
      items: currentCV?.experience || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: ExperiencesFormData) => {
    const sanitizedExperience = data.items.map((item) => ({
      ...item,
      city: item.city || '',
      endDate: item.endDate || '',
      description: item.description || '',
    }));
    updateCurrentCV({ experience: sanitizedExperience });
    nextStep();
  };

  const addItem = () => {
    append({
      id: crypto.randomUUID(),
      jobTitle: '',
      company: '',
      city: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      bullets: [],
    });
  };

  return (
    <Container>
      <Title>Work History</Title>
      <Subtitle>Start with your most recent job.</Subtitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <ItemCard key={field.id}>
            <CardHeader>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <GripVertical size={16} color="#ccc" />
                <span style={{ fontWeight: 'bold' }}>Position {index + 1}</span>
              </div>
              <RemoveButton type="button" onClick={() => remove(index)}>
                <Trash2 size={14} /> Remove
              </RemoveButton>
            </CardHeader>

            <Row>
              <Col>
                <FormGroup>
                  <Label>Job Title</Label>
                  <Input {...register(`items.${index}.jobTitle` as const)} placeholder="e.g. Sales Manager" />
                  {errors.items?.[index]?.jobTitle && (
                    <span style={{ color: 'red', fontSize: '1.2rem' }}>Required</span>
                  )}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Employer</Label>
                  <Input {...register(`items.${index}.company` as const)} placeholder="e.g. Google" />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Label>City/Town</Label>
                  <Input {...register(`items.${index}.city` as const)} />
                </FormGroup>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>Start Date</Label>
                      <Input type="month" {...register(`items.${index}.startDate` as const)} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>End Date</Label>
                      <Input type="month" {...register(`items.${index}.endDate` as const)} />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>

            <FormGroup>
              <Label>Description</Label>
              <TextArea
                {...register(`items.${index}.description` as const)}
                placeholder="Describe your responsibilities and achievements..."
              />
            </FormGroup>
          </ItemCard>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addItem}
          fullWidth
          style={{ borderStyle: 'dashed' }}
        >
          <Plus size={16} style={{ marginRight: 8 }} /> Add Experience
        </Button>

        <ActionButtons>
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" variant="primary">
            Next: Education
          </Button>
        </ActionButtons>
      </form>
    </Container>
  );
};

export default ExperienceForm;
