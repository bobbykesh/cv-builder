'use client';

import React, { useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCVStore } from '@/store/cvStore';
import { useExport } from '@/hooks/useExport';
import { Header, Button, LoadingSpinner } from '@/components/shared';
import LivePreview from '@/components/builder/LivePreview';
import { Download, ArrowLeft } from 'lucide-react';

const Container = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  background: #f0f0f0;
`;

const Sidebar = styled.div`
  width: 350px;
  background: white;
  padding: 30px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PreviewArea = styled.div`
  flex: 1;
  overflow: hidden;
  padding: 40px;
  display: flex;
  justify-content: center;
  background: #555;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #666;
  font-size: 1.4rem;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// This component uses useSearchParams, so it MUST be inside Suspense
function PreviewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { loadCV, currentCV } = useCVStore();
  const router = useRouter();
  const { exportCV, isExporting } = useExport();

  useEffect(() => {
    if (id) loadCV(id);
  }, [id, loadCV]);

  if (!currentCV) return <LoadingSpinner fullScreen />;

  return (
    <Container>
      <Sidebar>
        <div>
          <Title>Ready to download?</Title>
          <Description>
            Your CV is looking great! Choose a format to download.
          </Description>
        </div>

        <ButtonGroup>
          <Button
            variant="primary"
            onClick={() => exportCV(currentCV, { format: 'txt' })}
            disabled={isExporting}
          >
            <Download size={18} style={{ marginRight: 8 }} />
            Download as TXT
          </Button>
          
          <Button
            variant="outline"
            onClick={() => exportCV(currentCV, { format: 'pdf' })}
            disabled={isExporting}
          >
            <Download size={18} style={{ marginRight: 8 }} />
            Download as PDF (Text only)
          </Button>

          <div style={{ height: 20 }} />

          <Button
            variant="link"
            onClick={() => router.push(`/build-cv/editor?id=${currentCV.id}`)}
          >
            <ArrowLeft size={16} style={{ marginRight: 5 }} /> Back to Editor
          </Button>
        </ButtonGroup>
      </Sidebar>

      <PreviewArea>
        <LivePreview />
      </PreviewArea>
    </Container>
  );
}

// Main page component - wraps content in Suspense
export default function PreviewPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingSpinner fullScreen text="Loading preview..." />}>
        <PreviewContent />
      </Suspense>
    </>
  );
}
