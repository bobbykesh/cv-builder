'use client';

import React from 'react';
import styled from 'styled-components';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useCV } from '@/hooks/useCV';
import { Button } from '@/components/shared';
import { educationSchema } from '@/lib/utils/validators';
import { z } from 'zod';

const educationsSchema = z.object({
  items: z.array(educationSchema),
});

type EducationsFormData = z.infer<typeof educationsSchema>;

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

export const EducationForm: React.FC = () => {
  const { currentCV, updateCurrentCV, nextStep, prevStep } = useCV();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationsFormData>({
    resolver: zodResolver(educationsSchema),
    defaultValues: {
      items: currentCV?.education || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: EducationsFormData) => {
    const sanitizedEducation = data.items.map((item) => ({
      ...item,
      city: item.city || '',
      endDate: item.endDate || '',
      description: item.description || '',
    }));
    updateCurrentCV({ education: sanitizedEducation });
    nextStep();
  };

  const addItem = () => {
    append({
      id: crypto.randomUUID(),
      degree: '',
      school: '',
      city: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  return (
    <Container>
      <Title>Education</Title>
      <Subtitle>Add your education history.</Subtitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <ItemCard key={field.id}>
            <CardHeader>
              <span style={{ fontWeight: 'bold' }}>Education {index + 1}</span>
              <RemoveButton type="button" onClick={() => remove(index)}>
                <Trash2 size={14} /> Remove
              </RemoveButton>
            </CardHeader>

            <Row>
              <Col>
                <FormGroup>
                  <Label>School Name</Label>
                  <Input {...register(`items.${index}.school` as const)} placeholder="e.g. University of Manchester" />
                  {errors.items?.[index]?.school && (
                    <span style={{ color: 'red', fontSize: '1.2rem' }}>Required</span>
                  )}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Degree</Label>
                  <Input {...register(`items.${index}.degree` as const)} placeholder="e.g. BSc Computer Science" />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Label>City</Label>
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
          </ItemCard>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addItem}
          fullWidth
          style={{ borderStyle: 'dashed' }}
        >
          <Plus size={16} style={{ marginRight: 8 }} /> Add Education
        </Button>

        <ActionButtons>
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" variant="primary">
            Next: Skills
          </Button>
        </ActionButtons>
      </form>
    </Container>
  );
};

export default EducationForm;
