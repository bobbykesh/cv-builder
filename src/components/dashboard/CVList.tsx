'use client';

import React from 'react';
import styled from 'styled-components';
import { useCVStore } from '@/store/cvStore';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Copy, FileText } from 'lucide-react';
import { Button } from '@/components/shared';
import { useCV } from '@/hooks/useCV';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const Card = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  transition: shadow 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const Preview = styled.div`
  height: 150px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 5px;
`;

const DateText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 15px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding: 15px 20px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const ActionBtn = styled.button`
  color: ${({ theme }) => theme.colors.text};
  &:hover { color: ${({ theme }) => theme.colors.primary}; }
`;

export const CVList: React.FC = () => {
  const { cvs } = useCVStore();
  const { deleteCV, duplicateCV } = useCV();
  const router = useRouter();

  if (cvs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <p>You haven't created any CVs yet.</p>
        <br />
        <Button href="/build-cv" variant="primary">Create New CV</Button>
      </div>
    );
  }

  return (
    <Grid>
      {cvs.map((cv) => (
        <Card key={cv.id}>
          <Preview>
            <FileText size={40} />
          </Preview>
          <Content>
            <Title>{cv.title || 'Untitled CV'}</Title>
            <DateText>Last updated: {new Date(cv.updatedAt).toLocaleDateString()}</DateText>
          </Content>
          <Actions>
            <ActionBtn onClick={() => router.push(`/build-cv/editor?id=${cv.id}`)} title="Edit">
              <Edit size={18} />
            </ActionBtn>
            <ActionBtn onClick={() => duplicateCV(cv.id)} title="Duplicate">
              <Copy size={18} />
            </ActionBtn>
            <ActionBtn onClick={() => deleteCV(cv.id, cv.title)} title="Delete" style={{ color: 'red' }}>
              <Trash2 size={18} />
            </ActionBtn>
          </Actions>
        </Card>
      ))}
    </Grid>
  );
};

export default CVList;
