'use client';

import React, { useEffect, Suspense } from 'react';
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
import { Header, LoadingSpinner } from '@/components/shared';

const EditorLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

function EditorContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { loadCV, currentCV, currentStep } = useCVStore();
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

  if (!currentCV) return <LoadingSpinner fullScreen text="Loading editor..." />;

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
    <>
      <StepWizard />
      <MainContent>
        {renderStep()}
      </MainContent>
    </>
  );
}

export default function EditorPage() {
  return (
    <EditorLayout>
      <Header />
      <Suspense fallback={<LoadingSpinner fullScreen text="Initializing editor..." />}>
        <EditorContent />
      </Suspense>
    </EditorLayout>
  );
}
