'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { useCVStore } from '@/store/cvStore';
import StepWizard from '@/components/builder/StepWizard';
import PersonalInfoForm from '@/components/builder/PersonalInfoForm';
import ExperienceForm from '@/components/builder/ExperienceForm';
import EducationForm from '@/components/builder/EducationForm';
import SkillsForm from '@/components/builder/SkillsForm';
import SummaryForm from '@/components/builder/SummaryForm';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/shared';

const EditorLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

export default function EditorPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { loadCV, currentCV, currentStep, setCurrentStep } = useCVStore();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      loadCV(id);
    }
  }, [id, loadCV]);

  // If no CV loaded, redirect to selection
  useEffect(() => {
    if (!id) {
      router.push('/build-cv');
    }
  }, [id, router]);

  if (!currentCV) return null;

  // Render current step component
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm />;
      case 2:
        return <ExperienceForm />;
      case 3:
        return <EducationForm />;
      case 4:
        return <SkillsForm />;
      case 5:
        return <SummaryForm />;
      case 6:
        router.push(`/build-cv/preview?id=${currentCV.id}`);
        return null;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <EditorLayout>
      <Header />
      <StepWizard />
      <MainContent>
        {renderStep()}
      </MainContent>
    </EditorLayout>
  );
}
