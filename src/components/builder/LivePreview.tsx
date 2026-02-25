'use client';

import React from 'react';
import styled from 'styled-components';
import { useCV } from '@/hooks/useCV';
import dynamic from 'next/dynamic';

// Dynamic imports for templates to avoid SSR issues
const TemplateModern = dynamic(() => import('@/components/templates/TemplateModern'), { ssr: false });
const TemplateClassic = dynamic(() => import('@/components/templates/TemplateClassic'), { ssr: false });

const PreviewContainer = styled.div`
  background: #555;
  padding: 40px;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;

const A4Page = styled.div`
  width: 210mm;
  min-height: 297mm;
  background: white;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
  padding: 0;
  box-sizing: border-box;
  transform-origin: top center;
  
  @media (max-width: 900px) {
    transform: scale(0.6);
  }
`;

export const LivePreview: React.FC = () => {
  const { currentCV } = useCV();

  if (!currentCV) return null;

  const renderTemplate = () => {
    switch (currentCV.templateId) {
      case 'modern':
        return <TemplateModern data={currentCV} />;
      case 'classic':
        return <TemplateClassic data={currentCV} />;
      default:
        return <TemplateModern data={currentCV} />;
    }
  };

  return (
    <PreviewContainer>
      <A4Page id="cv-preview">
        {renderTemplate()}
      </A4Page>
    </PreviewContainer>
  );
};

export default LivePreview;
