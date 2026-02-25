'use client';

import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Circle = styled.div<{ $score: number }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(
    ${({ theme, $score }) => 
      $score > 80 ? theme.colors.success : 
      $score > 50 ? theme.colors.warning : 
      theme.colors.error} ${({ $score }) => $score * 3.6}deg,
    #f0f0f0 0deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 130px;
    height: 130px;
    background: white;
    border-radius: 50%;
  }
`;

const ScoreText = styled.span`
  position: relative;
  font-size: 3.5rem;
  font-weight: 800;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.4rem;
`;

interface ScoreCardProps {
  score: number;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  let message = "Needs improvement. Let's fix some issues.";
  if (score > 50) message = "Good start! A few tweaks and you're ready.";
  if (score > 80) message = "Excellent! Your CV is ready for recruiters.";

  return (
    <Card>
      <Circle $score={score}>
        <ScoreText>{score}</ScoreText>
      </Circle>
      <Title>CV Score</Title>
      <Message>{message}</Message>
    </Card>
  );
};

export default ScoreCard;
