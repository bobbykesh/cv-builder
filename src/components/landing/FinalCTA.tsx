'use client';

import React from 'react';
import styled from 'styled-components';
import { Button } from '@/components/shared';
import { media } from '@/styles/breakpoints';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 90px 0 0 0;
  padding: 70px 0 80px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    width: 90px;
    height: 90px;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    inset: -90px 0 auto auto;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 0 30px;
  margin: 0 auto;
  text-align: center;

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

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3.2rem;
  line-height: 4rem;
  margin-bottom: 15px;

  ${media.md} {
    font-size: 4.6rem;
    line-height: 5.8rem;
  }

  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SubHeading = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.2rem;
  margin: 0 auto 40px;
  max-width: 800px;

  ${media.md} {
    font-size: 1.8rem;
    width: 74%;
  }
`;

export const FinalCTA: React.FC = () => {
  return (
    <Section>
      <Container>
        <Heading>
          Your perfect CV – <span>in minutes</span>
        </Heading>
        <SubHeading>
          Writing the perfect CV has never been easier. Just choose one of our
          job-winning designs and add our expert-written examples. In just 10
          minutes, you'll have a flawless professional CV.
        </SubHeading>
        <Button href="/build-cv" variant="primary" size="large">
          Create my CV
        </Button>
      </Container>
    </Section>
  );
};

export default FinalCTA;
