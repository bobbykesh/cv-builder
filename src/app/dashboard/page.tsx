'use client';

import React, { Suspense, useRef } from 'react';
import styled from 'styled-components';
import { Header, Footer, Button, LoadingSpinner } from '@/components/shared';
import CVList from '@/components/builder/CVList';
import { Plus, Upload } from 'lucide-react';
import { useCVParser } from '@/hooks/useCVParser';

const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  min-height: calc(100vh - 80px);
  padding: 40px 0;
`;

const Container = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

function DashboardContent() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleFileUpload, isParsing } = useCVParser();

  return (
    <>
      <Container>
        <HeaderRow>
          <h1>My Documents</h1>
          <ButtonGroup>
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              size="medium" 
              variant="outline"
              disabled={isParsing}
            >
              <Upload size={16} style={{ marginRight: 8 }} />
              Upload CV
            </Button>
            
            <Button href="/build-cv" size="medium">
              <Plus size={16} style={{ marginRight: 8 }} />
              Create New
            </Button>
          </ButtonGroup>
          
          <input 
            type="file" 
            ref={fileInputRef}
            accept=".pdf,.docx"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </HeaderRow>

        <CVList />
      </Container>
      {isParsing && <LoadingSpinner fullScreen text="Revamping your CV..." />}
    </>
  );
}

export default function DashboardPage() {
  return (
    <>
      <Header />
      <Main>
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <DashboardContent />
        </Suspense>
      </Main>
      <Footer />
    </>
  );
}
