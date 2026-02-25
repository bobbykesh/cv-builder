'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header, Footer, Button, LoadingSpinner } from '@/components/shared';
import { useCVStore } from '@/store/cvStore';
import { analyzeCV } from '@/lib/cv-check/rules';
import ScoreCard from '@/components/cv-check/ScoreCard';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { CVCheckIssue, CVCheckRule } from '@/types/cv';
import Link from 'next/link';

const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  min-height: calc(100vh - 80px);
  padding: 40px 0;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-top: 30px;

  @media (min-width: 900px) {
    grid-template-columns: 350px 1fr;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const IssueCard = styled.div<{ $severity: 'error' | 'warning' }>`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border-left: 5px solid ${({ theme, $severity }) => 
    $severity === 'error' ? theme.colors.error : theme.colors.warning};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const PassedCard = styled.div`
  background: white;
  padding: 15px 20px;
  border-radius: 12px;
  border-left: 5px solid ${({ theme }) => theme.colors.success};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IssueTitle = styled.h4`
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 10px;
`;

const Suggestion = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 10px;
  border-radius: 6px;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 16px;
`;

export default function CVCheckPage() {
  const { currentCV } = useCVStore();
  const [results, setResults] = useState<{ score: number; issues: CVCheckIssue[]; passed: CVCheckRule[] } | null>(null);

  useEffect(() => {
    if (currentCV) {
      const analysis = analyzeCV(currentCV);
      setResults(analysis);
    }
  }, [currentCV]);

  if (!currentCV) {
    return (
      <>
        <Header />
        <Main>
          <Container>
            <EmptyState>
              <h1>No CV Found</h1>
              <p>Please create or load a CV to analyze it.</p>
              <br />
              <Button href="/build-cv" variant="primary">Create CV</Button>
            </EmptyState>
          </Container>
        </Main>
        <Footer />
      </>
    );
  }

  if (!results) return <LoadingSpinner fullScreen />;

  return (
    <>
      <Header />
      <Main>
        <Container>
          <h1>CV Check Analysis</h1>
          <p>We've analyzed your "{currentCV.title}" for common issues.</p>

          <Grid>
            <div>
              <ScoreCard score={results.score} />
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <Button href={`/build-cv/editor?id=${currentCV.id}`} variant="outline" fullWidth>
                  Back to Editor
                </Button>
              </div>
            </div>

            <ResultsContainer>
              <h3>Action Items ({results.issues.length})</h3>
              {results.issues.map((issue, idx) => (
                <IssueCard key={idx} $severity={issue.severity as 'error' | 'warning'}>
                  <IssueTitle>
                    <AlertCircle size={20} color={issue.severity === 'error' ? '#ff3d3c' : '#e07020'} />
                    {issue.title}
                  </IssueTitle>
                  <Description>{issue.description}</Description>
                  <Suggestion>💡 Fix: {issue.suggestion}</Suggestion>
                  <div style={{ marginTop: 15, textAlign: 'right' }}>
                    <Link href={`/build-cv/editor?id=${currentCV.id}`} style={{ color: '#002d6b', fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none' }}>
                      Fix Now <ArrowRight size={12} style={{ display: 'inline' }} />
                    </Link>
                  </div>
                </IssueCard>
              ))}

              {results.passed.length > 0 && (
                <>
                  <h3 style={{ marginTop: 20 }}>Passed Checks ({results.passed.length})</h3>
                  {results.passed.map((rule, idx) => (
                    <PassedCard key={idx}>
                      <CheckCircle size={20} color="#00856c" />
                      <div>
                        <strong>{rule.title}</strong>
                        <p style={{ fontSize: '1.2rem', margin: 0 }}>{rule.description}</p>
                      </div>
                    </PassedCard>
                  ))}
                </>
              )}
            </ResultsContainer>
          </Grid>
        </Container>
      </Main>
      <Footer />
    </>
  );
}
