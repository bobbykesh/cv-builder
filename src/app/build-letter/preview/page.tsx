'use client';

import React, { Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header, Button, LoadingSpinner } from '@/components/shared';
import { useLetter } from '@/hooks/useLetter';
import { useExport } from '@/hooks/useExport';
import { ArrowLeft, Download } from 'lucide-react';

const Container = styled.div`
  display: flex;
  height: calc(100vh - 80px);
`;

const Sidebar = styled.div`
  width: 300px;
  background: white;
  padding: 30px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PreviewArea = styled.div`
  flex: 1;
  background: #555;
  padding: 40px;
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;

const Paper = styled.div`
  width: 210mm;
  min-height: 297mm;
  background: white;
  padding: 40px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
`;

function PreviewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { loadLetter, currentLetter } = useLetter();
  const { exportLetter, isExporting } = useExport();
  const router = useRouter();

  useEffect(() => {
    if (id) loadLetter(id);
  }, [id, loadLetter]);

  if (!currentLetter) return <LoadingSpinner fullScreen />;

  return (
    <Container>
      <Sidebar>
        <h2>Download</h2>
        <p>Your cover letter is ready.</p>
        <Button 
          variant="primary" 
          fullWidth 
          onClick={() => exportLetter(currentLetter, { format: 'txt' })}
          disabled={isExporting}
        >
          <Download size={16} style={{ marginRight: 8 }} /> Download TXT
        </Button>
        <Button 
          variant="outline" 
          fullWidth
          onClick={() => router.push(`/build-letter/editor?id=${currentLetter.id}`)}
        >
          <ArrowLeft size={16} style={{ marginRight: 8 }} /> Back to Editor
        </Button>
      </Sidebar>
      <PreviewArea>
        <Paper>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>
            {currentLetter.personalInfo.firstName} {currentLetter.personalInfo.lastName}
          </h1>
          <p>{currentLetter.personalInfo.email} | {currentLetter.personalInfo.phone}</p>
          <hr style={{ margin: '20px 0' }} />
          <p>{new Date().toLocaleDateString()}</p>
          <br />
          <p><strong>To: {currentLetter.recipientInfo.name || 'Hiring Manager'}</strong></p>
          <p>{currentLetter.recipientInfo.company}</p>
          <br />
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {currentLetter.content.body || 'Your content will appear here...'}
          </div>
        </Paper>
      </PreviewArea>
    </Container>
  );
}

export default function LetterPreviewPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <PreviewContent />
      </Suspense>
    </>
  );
}
