'use client';

import React, { Suspense } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { Header, Footer, Button, LoadingSpinner } from '@/components/shared';
import { TEMPLATES } from '@/types/template';
import { useCV } from '@/hooks/useCV';
import { media } from '@/styles/breakpoints';

const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  min-height: calc(100vh - 80px);
  padding: 40px 0;
`;

const Container = styled.div`
  width: 100%;
  padding: 0 30px;
  margin: 0 auto;

  ${media.md} {
    max-width: 1170px;
    padding: 0 15px;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30px;

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${media.xl} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TemplateCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};

    .overlay {
      opacity: 1;
    }
  }
`;

const PreviewImage = styled.div<{ $color: string }>`
  aspect-ratio: 210/297;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  position: relative;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  /* Simplified CV Preview CSS */
  &::before {
    content: '';
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
    margin-bottom: 10px;
  }

  &::after {
    content: '';
    width: 60%;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.text};
    border-radius: 4px;
    opacity: 0.8;
  }
`;

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;

  span {
    height: 6px;
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
    
    &:nth-child(1) { width: 100%; }
    &:nth-child(2) { width: 90%; }
    &:nth-child(3) { width: 95%; }
    &:nth-child(4) { width: 80%; }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 45, 107, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const CardFooter = styled.div`
  padding: 16px;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const TemplateName = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

function TemplateList() {
  const router = useRouter();
  const { createNewCV, isLoading } = useCV();

  const handleSelect = (templateId: string, color: string) => {
    const newCV = createNewCV(templateId, color);
    if (newCV) {
      router.push(`/build-cv/editor?id=${newCV.id}`);
    }
  };

  if (isLoading) return <LoadingSpinner fullScreen text="Creating your CV..." />;

  return (
    <Grid>
      {TEMPLATES.map((template) => (
        <TemplateCard key={template.id}>
          <PreviewImage $color={template.colors[0]}>
            <Lines>
              <span />
              <span />
              <span />
              <span />
            </Lines>
            <Lines style={{ marginTop: 20 }}>
              <span style={{ width: '40%', height: 8, background: template.colors[0] }} />
              <span />
              <span />
            </Lines>
          </PreviewImage>
          
          <Overlay className="overlay">
            <Button
              size="small"
              onClick={() => handleSelect(template.id, template.colors[0])}
            >
              Select Template
            </Button>
          </Overlay>

          <CardFooter>
            <TemplateName>{template.name}</TemplateName>
          </CardFooter>
        </TemplateCard>
      ))}
    </Grid>
  );
}

export default function TemplateSelectionPage() {
  return (
    <>
      <Header />
      <Main>
        <Container>
          <HeaderSection>
            <Title>Choose a Template</Title>
            <Subtitle>
              Select a design to start building your professional CV
            </Subtitle>
          </HeaderSection>
          
          <Suspense fallback={<LoadingSpinner />}>
            <TemplateList />
          </Suspense>
        </Container>
      </Main>
      <Footer />
    </>
  );
}
