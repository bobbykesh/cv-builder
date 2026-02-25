'use client';

import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Header, Footer, Button } from '@/components/shared';
import CVList from '@/components/builder/CVList';
import { Plus } from 'lucide-react';

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

export default function DashboardPage() {
  return (
    <>
      <Header />
      <Main>
        <Container>
          <HeaderRow>
            <h1>My Documents</h1>
            <Button href="/build-cv" size="medium">
              <Plus size={16} style={{ marginRight: 8 }} />
              Create New
            </Button>
          </HeaderRow>

          <Suspense fallback={<p>Loading...</p>}>
            <CVList />
          </Suspense>
        </Container>
      </Main>
      <Footer />
    </>
  );
}
