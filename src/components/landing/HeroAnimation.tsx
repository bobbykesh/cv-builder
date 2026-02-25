'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { media } from '@/styles/breakpoints';

const AnimationContainer = styled.div`
  position: relative;
  min-width: 300px;
  height: 385px;
  overflow: hidden;
  margin: 0 auto;

  ${media.md} {
    min-width: 390px;
    height: 500px;
  }
`;

const DottedBackground = styled.div`
  position: absolute;
  width: 84%;
  height: 66%;
  z-index: 1;
  background: radial-gradient(
    ellipse at center,
    #000 0%,
    #000 0%,
    transparent 10%
  );
  background-size: 19px 17px;
  transform: translate(58px, 60px);
`;

const InnerBox = styled.div`
  position: relative;
  width: 93%;
  height: 94%;
`;

interface AnimatedBoxProps {
  $state: 1 | 2;
}

const leftBoxAnimation1 = keyframes`
  0% {
    width: 72.3%;
    height: 68.7%;
    transform: translate(0, 45.5%);
    border-radius: 70px 0 0 0;
  }
  40% {
    width: 50.2%;
    height: 39%;
    transform: translate(0, 100px);
    border-radius: 50%;
  }
  60% {
    width: 50.2%;
    height: 39%;
    transform: translate(0, 100px);
    border-radius: 50%;
  }
  100% {
    width: 88.8%;
    height: 97%;
    transform: translate(15px, 15px);
    border-radius: 0;
  }
`;

const leftBoxAnimation2 = keyframes`
  0% {
    width: 88.8%;
    height: 97%;
    transform: translate(15px, 15px);
    border-radius: 0;
  }
  40% {
    width: 50.2%;
    height: 39%;
    transform: translate(0, 100px);
    border-radius: 50%;
  }
  60% {
    width: 50.2%;
    height: 39%;
    transform: translate(0, 100px);
    border-radius: 50%;
  }
  100% {
    width: 72.3%;
    height: 68.7%;
    transform: translate(0, 45.5%);
    border-radius: 70px 0 0 0;
  }
`;

const LeftBox = styled.div<AnimatedBoxProps>`
  position: absolute;
  z-index: 3;
  background: ${({ theme }) => theme.colors.gold};
  width: ${({ $state }) => ($state === 1 ? '72.3%' : '88.8%')};
  height: ${({ $state }) => ($state === 1 ? '68.7%' : '97%')};
  transform: ${({ $state }) =>
    $state === 1 ? 'translate(0, 45.5%)' : 'translate(15px, 15px)'};
  border-radius: ${({ $state }) => ($state === 1 ? '70px 0 0 0' : '0')};

  ${({ $state }) =>
    $state === 1
      ? css`
          animation: ${leftBoxAnimation1} 1s cubic-bezier(0.29, -0.38, 0.84, 1)
            2s forwards;
        `
      : css`
          animation: ${leftBoxAnimation2} 1s cubic-bezier(0.29, -0.38, 0.84, 1)
            2s forwards;
        `}
`;

const rightBoxAnimation1 = keyframes`
  0% {
    width: 73.6%;
    height: 100%;
    transform: translate(36%, 0);
  }
  40% {
    width: 53%;
    height: 59%;
    transform: translate(98px, 69%);
  }
  60% {
    width: 53%;
    height: 59%;
    transform: translate(98px, 69%);
  }
  100% {
    width: 53%;
    height: 0;
    transform: translate(98px, 460px);
  }
`;

const rightBoxAnimation2 = keyframes`
  0% {
    width: 53%;
    height: 0;
    transform: translate(98px, 460px);
  }
  40% {
    width: 53%;
    height: 59%;
    transform: translate(98px, 69%);
  }
  60% {
    width: 53%;
    height: 59%;
    transform: translate(98px, 69%);
  }
  100% {
    width: 73.6%;
    height: 100%;
    transform: translate(36%, 0);
  }
`;

const RightBox = styled.div<AnimatedBoxProps>`
  position: absolute;
  z-index: 2;
  background: ${({ theme }) => theme.colors.accentLight};
  border-radius: 70px 0;
  width: ${({ $state }) => ($state === 1 ? '73.6%' : '53%')};
  height: ${({ $state }) => ($state === 1 ? '100%' : '0')};
  transform: ${({ $state }) =>
    $state === 1 ? 'translate(36%, 0)' : 'translate(98px, 460px)'};

  ${({ $state }) =>
    $state === 1
      ? css`
          animation: ${rightBoxAnimation1} 1s cubic-bezier(0.29, -0.38, 0.84, 1)
            2s forwards;
        `
      : css`
          animation: ${rightBoxAnimation2} 1s cubic-bezier(0.29, -0.38, 0.84, 1)
            2s forwards;
        `}
`;

const personAnimation1 = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(400px);
  }
`;

const personAnimation2 = keyframes`
  0% {
    transform: translateX(400px);
  }
  100% {
    transform: translateX(0);
  }
`;

const PersonImage = styled.div<AnimatedBoxProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 4;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  ${({ $state }) =>
    $state === 1
      ? css`
          animation: ${personAnimation1} 0.6s cubic-bezier(0.21, 0.55, 0.44, 1.29)
            2s forwards;
        `
      : css`
          transform: translateX(400px);
          animation: ${personAnimation2} 0.6s cubic-bezier(0.21, 0.55, 0.44, 1.29)
            2.8s forwards;
        `}
`;

const PersonPlaceholder = styled.div`
  width: 70%;
  height: 90%;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.primaryLight} 0%,
    ${({ theme }) => theme.colors.primary} 100%
  );
  border-radius: 50% 50% 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 6rem;
  font-weight: bold;
`;

const cvAnimation1 = keyframes`
  0% {
    transform: translateY(500px);
  }
  100% {
    transform: translateY(0);
  }
`;

const cvAnimation2 = keyframes`
  0% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(500px);
  }
`;

const CVImage = styled.div<AnimatedBoxProps>`
  position: absolute;
  z-index: 5;
  background: ${({ theme }) => theme.colors.background};
  width: 89%;
  height: 97%;
  transform: translateY(500px);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 20px;

  ${({ $state }) =>
    $state === 1
      ? css`
          animation: ${cvAnimation1} 0.6s cubic-bezier(0.21, 0.55, 0.44, 1.29) 3s
            forwards;
        `
      : css`
          transform: translateY(0);
          animation: ${cvAnimation2} 0.6s cubic-bezier(0.29, -0.38, 0.84, 1) 1.5s
            forwards;
        `}
`;

const CVPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CVHeader = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.backgroundAlt};
`;

const CVPhoto = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
`;

const CVName = styled.div`
  flex: 1;
`;

const CVLine = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '8px'};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 4px;
  margin-bottom: 5px;
`;

const CVSection = styled.div`
  margin-top: 10px;
`;

export const HeroAnimation: React.FC = () => {
  const [animationState, setAnimationState] = useState<1 | 2>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState((prev) => (prev === 1 ? 2 : 1));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimationContainer>
      <DottedBackground />
      <InnerBox>
        <LeftBox $state={animationState} />
        <RightBox $state={animationState} />

        <PersonImage $state={animationState}>
          <PersonPlaceholder>👤</PersonPlaceholder>
        </PersonImage>

        <CVImage $state={animationState}>
          <CVPlaceholder>
            <CVHeader>
              <CVPhoto />
              <CVName>
                <CVLine $width="70%" $height="12px" />
                <CVLine $width="50%" $height="8px" />
              </CVName>
            </CVHeader>
            <CVSection>
              <CVLine $width="40%" $height="10px" />
              <CVLine $width="100%" />
              <CVLine $width="90%" />
              <CVLine $width="95%" />
            </CVSection>
            <CVSection>
              <CVLine $width="35%" $height="10px" />
              <CVLine $width="100%" />
              <CVLine $width="85%" />
            </CVSection>
            <CVSection>
              <CVLine $width="30%" $height="10px" />
              <CVLine $width="60%" />
              <CVLine $width="45%" />
              <CVLine $width="55%" />
            </CVSection>
          </CVPlaceholder>
        </CVImage>
      </InnerBox>
    </AnimationContainer>
  );
};

export default HeroAnimation;
