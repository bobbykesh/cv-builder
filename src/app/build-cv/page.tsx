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
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.accent};

    .overlay {
      opacity: 1;
    }
  }
`;

// ----- CSS-Based Template Previews -----

const PreviewContainer = styled.div`
  aspect-ratio: 210/297;
  background: white;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

// Modern Template (Sidebar Left)
const ModernPreview = styled(PreviewContainer)<{ $color: string }>`
  flex-direction: row;
  padding: 0;

  .sidebar {
    width: 30%;
    background-color: ${({ $color }) => $color};
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .main {
    width: 70%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .avatar {
    width: 30px;
    height: 30px;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .line {
    height: 4px;
    background: #eee;
    border-radius: 2px;
    margin-bottom: 4px;
  }

  .sidebar .line {
    background: rgba(255,255,255,0.3);
  }
`;

// Classic Template (Centered Header)
const ClassicPreview = styled(PreviewContainer)`
  align-items: center;
  padding: 20px;

  .header {
    text-align: center;
    width: 100%;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  .line {
    height: 4px;
    background: #ddd;
    border-radius: 2px;
    margin-bottom: 6px;
    width: 100%;
  }

  .section {
    width: 100%;
    margin-bottom: 10px;
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

// Helper component to render the correct preview style
const TemplatePreview: React.FC<{ id: string; color: string }> = ({ id, color }) => {
  if (id === 'modern' || id === 'professional' || id === 'bold') {
    return (
      <ModernPreview $color={color}>
        <div className="sidebar">
          <div className="avatar" />
          <div className="line" style={{ width: '80%' }} />
          <div className="line" style={{ width: '60%' }} />
          <div className="line" style={{ marginTop: 10, width: '40%' }} />
          <div className="line" />
          <div className="line" />
        </div>
        <div className="main">
          <div className="line" style={{ height: 8, width: '60%', background: '#333' }} />
          <div className="line" style={{ height: 6, width: '40%' }} />
          <div className="line" style={{ marginTop: 15, width: '30%', background: color }} />
          <div className="line" />
          <div className="line" />
          <div className="line" style={{ width: '90%' }} />
        </div>
      </ModernPreview>
    );
  }

  // Default / Classic
  return (
    <ClassicPreview>
      <div className="header">
        <div className="line" style={{ height: 8, width: '50%', margin: '0 auto 5px', background: '#333' }} />
        <div className="line" style={{ width: '30%', margin: '0 auto' }} />
      </div>
      <div className="section">
        <div className="line" style={{ width: '25%', background: color }} />
        <div className="line" />
        <div className="line" style={{ width: '90%' }} />
      </div>
      <div className="section">
        <div className="line" style={{ width: '25%', background: color }} />
        <div className="line" />
        <div className="line" style={{ width: '80%' }} />
      </div>
    </ClassicPreview>
  );
};

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
        <TemplateCard key={template.id} onClick={() => handleSelect(template.id, template.colors[0])}>
          <TemplatePreview id={template.id} color={template.colors[0]} />
          
          <Overlay className="overlay">
            <Button size="small">Use Template</Button>
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
