'use client';

import React from 'react';
import styled from 'styled-components';
import { Button, Badge } from '@/components/shared';
import HeroAnimation from './HeroAnimation';
import { media } from '@/styles/breakpoints';

const HeroSection = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 40px 0;
  overflow: hidden;
  border-radius: 0 0 0 120px;

  ${media.md} {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 0 30px;
  margin: 0 auto;

  ${media.md} {
    max-width: 750px;
    padding: 0 15px;
  }

  ${media.lg} {
    max-width: 970px;
  }

  ${media.xl} {
    max-width: 1170px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  ${media.md} {
    flex-direction: row;
    gap: 35px;
  }
`;

const AnimationWrapper = styled.div`
  order: 0;

  ${media.md} {
    order: 0;
    width: 50%;
  }
`;

const ContentBox = styled.div`
  text-align: center;
  order: 1;

  ${media.md} {
    text-align: left;
    width: 50%;
    order: 1;
  }
`;

const Heading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 4rem;
  line-height: 5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;

  ${media.md} {
    font-size: 5.8rem;
    line-height: 7rem;
  }

  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SubHeading = styled.p`
  font-size: 1.6rem;
  line-height: 2.6rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 40px;

  ${media.md} {
    font-size: 2rem;
    line-height: 3rem;
    margin-bottom: 50px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  ${media.md} {
    flex-direction: row;
    justify-content: flex-start;
    gap: 20px;
  }
`;

const BadgeWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;

  ${media.md} {
    justify-content: flex-start;
  }
`;

export const Hero: React.FC = () => {
  return (
    <HeroSection>
      <Container>
        <Content>
          <AnimationWrapper>
            <HeroAnimation />
          </AnimationWrapper>

          <ContentBox>
            <Heading>
              Build your <span>perfect</span> CV
            </Heading>
            <SubHeading>
              Create a new standout CV in minutes or choose any template and
              simply import all the information from your existing CV.
            </SubHeading>

            <ButtonWrapper>
              <Button href="/build-cv" variant="primary" size="large">
                Start a new CV
              </Button>
              <Button href="/build-cv" variant="secondary" size="large">
                Upload my CV
              </Button>
            </ButtonWrapper>

            <BadgeWrapper>
              <Badge variant="gradient" icon>
                AI-supported
              </Badge>
            </BadgeWrapper>
          </ContentBox>
        </Content>
      </Container>
    </HeroSection>
  );
};

export default Hero;
