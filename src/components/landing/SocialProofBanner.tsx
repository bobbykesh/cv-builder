'use client';

import React from 'react';
import styled from 'styled-components';
import { SOCIAL_PROOF_STATS } from '@/lib/utils/constants';
import { media } from '@/styles/breakpoints';

const Section = styled.section`
  padding: 60px 0 0;
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

const Banner = styled.div`
  background: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 0 100px;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    padding: 30px 100px;
    gap: 87px;
  }
`;

const StatBox = styled.div`
  text-align: center;

  ${media.md} {
    text-align: left;
  }
`;

const StatHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 3.2rem;
  line-height: 4rem;

  ${media.md} {
    font-size: 4rem;
    line-height: 4.8rem;
  }

  span:first-child {
    display: block;
  }

  span:last-child {
    font-size: 2.6rem;
    line-height: 3.2rem;

    ${media.md} {
      font-size: 3.2rem;
      line-height: 3.8rem;
    }
  }
`;

const Disclaimer = styled.p`
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: 400;
  margin-top: 20px;

  ${media.md} {
    margin-top: 40px;
  }
`;

export const SocialProofBanner: React.FC = () => {
  return (
    <Section>
      <Container>
        <Banner>
          <div />
          <StatBox>
            <StatHeading>
              <span>{SOCIAL_PROOF_STATS.satisfactionRate}%</span>
              <span>
                of PerfectCV users rate their experience positively.*
              </span>
            </StatHeading>
            <Disclaimer>
              *Based on a survey of {SOCIAL_PROOF_STATS.surveyUsers.toLocaleString()} users.
            </Disclaimer>
          </StatBox>
        </Banner>
      </Container>
    </Section>
  );
};

export default SocialProofBanner;
