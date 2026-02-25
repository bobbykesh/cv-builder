'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { Header, Footer, Button } from '@/components/shared';
import { useLetter } from '@/hooks/useLetter';
import { TEMPLATES } from '@/types/template';

const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  min-height: calc(100vh - 80px);
  padding: 40px 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const Preview = styled.div<{ $color: string }>`
  height: 300px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  margin-bottom: 15px;
  border-top: 10px solid ${({ $color }) => $color};
`;

export default function LetterTemplatePage() {
  const router = useRouter();
  const { createNewLetter } = useLetter();

  const handleSelect = (templateId: string, color: string) => {
    const newLetter = createNewLetter(templateId, color);
    if (newLetter) {
      router.push(`/build-letter/editor?id=${newLetter.id}`);
    }
  };

  return (
    <>
      <Header />
      <Main>
        <Container>
          <h1>Choose a Cover Letter Template</h1>
          <p>Match your cover letter design to your CV.</p>

          <Grid>
            {TEMPLATES.map((t) => (
              <Card key={t.id} onClick={() => handleSelect(t.id, t.colors[0])}>
                <Preview $color={t.colors[0]} />
                <h3>{t.name}</h3>
                <Button size="small" variant="outline">Select</Button>
              </Card>
            ))}
          </Grid>
        </Container>
      </Main>
      <Footer />
    </>
  );
}
