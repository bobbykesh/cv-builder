'use client';

import React from 'react';
import styled from 'styled-components';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { useCV } from '@/hooks/useCV';
import { Button } from '@/components/shared';
import { skillSchema } from '@/lib/utils/validators';
import { z } from 'zod';

const skillsSchema = z.object({
  items: z.array(skillSchema),
});

type SkillsFormData = z.infer<typeof skillsSchema>;

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SkillInput = styled.div`
  position: relative;
  
  input {
    width: 100%;
    padding: 12px;
    padding-right: 35px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      outline: none;
    }
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textLight};
  
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const LevelSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1.2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const SkillsForm: React.FC = () => {
  const { currentCV, updateCurrentCV, nextStep, prevStep } = useCV();

  const {
    register,
    control,
    handleSubmit,
  } = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      items: currentCV?.skills || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: SkillsFormData) => {
    updateCurrentCV({ skills: data.items });
    nextStep();
  };

  const addSkill = () => {
    append({
      id: crypto.randomUUID(),
      name: '',
      level: 'intermediate',
    });
  };

  return (
    <Container>
      <Title>Skills</Title>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          {fields.map((field, index) => (
            <div key={field.id}>
              <SkillInput>
                <input
                  {...register(`items.${index}.name` as const)}
                  placeholder="e.g. Project Management"
                />
                <DeleteBtn type="button" onClick={() => remove(index)}>
                  <X size={16} />
                </DeleteBtn>
              </SkillInput>
              <LevelSelect {...register(`items.${index}.level` as const)}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </LevelSelect>
            </div>
          ))}
        </Grid>

        <Button
          type="button"
          variant="outline"
          onClick={addSkill}
          style={{ borderStyle: 'dashed' }}
        >
          <Plus size={16} style={{ marginRight: 8 }} /> Add Skill
        </Button>

        <ActionButtons>
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" variant="primary">
            Next: Summary
          </Button>
        </ActionButtons>
      </form>
    </Container>
  );
};

export default SkillsForm;
