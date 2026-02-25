'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header, LoadingSpinner } from '@/components/shared';
import { useLetter } from '@/hooks/useLetter';
import LetterEditor from '@/components/letter/LetterEditor';
import styled from 'styled-components';

const Main = styled.main`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  min-height: 100vh;
`;

function EditorContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { loadLetter, currentLetter } = useLetter();
  const router = useRouter();

  useEffect(() => {
    if (id) loadLetter(id);
    else router.push('/build-letter');
  }, [id, loadLetter, router]);

  if (!currentLetter) return <LoadingSpinner fullScreen />;

  return <LetterEditor />;
}

export default function LetterEditorPage() {
  return (
    <>
      <Header />
      <Main>
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <EditorContent />
        </Suspense>
      </Main>
    </>
  );
}
