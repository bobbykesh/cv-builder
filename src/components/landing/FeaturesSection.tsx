'use client';

import React from 'react';
import styled from 'styled-components';
import { Check, Lock, ArrowUp } from 'lucide-react';
import { Button } from '@/components/shared';
import { SOCIAL_PROOF_STATS } from '@/lib/utils/constants';
import { media } from '@/styles/breakpoints';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 0 100px 100px 0;
  padding: 30px 0;
  position: relative;

  ${media.md} {
    padding: 60px 0;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    background: ${({ theme }) => theme.colors.primaryDark};
    z-index: 1;
    top: 100%;
  }

  &::after {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: 100px 0 0;
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
    padding: 0 180px;
  }
`;

const ContentBox = styled.div`
  text-align: center;
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.6rem;
  line-height: 3.1rem;
  color: ${({ theme }) => theme.colors.textWhite};
  padding-bottom: 20px;

  ${media.xl} {
    font-size: 3.2rem;
    line-height: 3.8rem;
    padding-bottom: 30px;
  }

  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const StatsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 1.4rem;
  line-height: 2.1rem;
  margin-bottom: 24px;

  ${media.md} {
    flex-direction: row;
    justify-content: center;
    gap: 30px;
  }
`;

const StatItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  svg {
    fill: ${({ theme }) => theme.colors.gold};
  }
`;

const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 32px 0;

  ${media.md} {
    flex-direction: row;
    align-items: stretch;
    gap: 30px;
  }
`;

const PlanCard = styled.div<{ $type: 'basic' | 'premium' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;
  border-radius: 16px;
  padding: 0 3px 3px;
  background: ${({ $type, theme }) =>
    $type === 'basic' ? theme.colors.secondaryLight : theme.colors.gold};

  ${media.md} {
    width: 48%;
    align-self: stretch;
  }
`;

const PlanBadge = styled.span`
  font-weight: 800;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.07em;
  padding: 11px 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const PlanContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 24px 24px 16px 16px;
  height: 100%;
  width: 100%;
`;

const PriceSection = styled.div`
  text-align: center;
  width: 300px;
`;

const Price = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3.6rem;
  line-height: 4.6rem;
  color: ${({ theme }) => theme.colors.text};

  ${media.md} {
    font-size: 4.8rem;
    line-height: 5.8rem;
  }
`;

const PriceDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  white-space: pre-line;

  span {
    font-weight: 700;
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;

  ${media.md} {
    gap: 24px;
  }
`;

const FeatureSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 0 16px;
  width: 100%;
`;

const FeatureItem = styled.div<{ $enabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  svg {
    flex-shrink: 0;
    fill: ${({ theme, $enabled }) =>
      $enabled ? theme.colors.success : theme.colors.border};
  }

  p {
    color: ${({ theme, $enabled }) =>
      $enabled ? theme.colors.text : theme.colors.textLight};
  }
`;

const FeatureText = styled.p`
  font-size: 1.4rem;
  line-height: 1.7rem;
  text-align: left;
  flex: 1;

  span {
    font-weight: 700;
  }
`;

const FooterContent = styled.div`
  margin-top: 24px;
  text-align: center;
`;

const Disclaimer = styled.p`
  font-size: 1rem;
  line-height: 1.4rem;
  color: ${({ theme }) => theme.colors.textWhite};
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;

  ${media.md} {
    flex-direction: row;
    gap: 30px;
  }
`;

const basicFeatures = [
  { text: 'Create <span>unlimited CVs</span> and cover letters.', enabled: true },
  { text: '<span>CV and cover letter generator</span> with step-by-step guidance.', enabled: true },
  { text: '<span>Expert-written content</span> for your CV tailored to your job and industry.', enabled: true },
  { text: '<span>Unlimited downloads</span> in TXT format.', enabled: true },
  { text: 'Unlimited downloads as <span>PDF or Word</span> file.', enabled: false },
  { text: '<span>CV Check™</span> to scan your CV for issues and suggest improvements.', enabled: false },
];

const premiumFeatures = [
  { text: 'Create <span>unlimited CVs</span> and cover letters.', enabled: true },
  { text: '<span>CV and cover letter generator</span> with step-by-step guidance.', enabled: true },
  { text: '<span>Expert-written content</span> for your CV tailored to your job and industry.', enabled: true },
  { text: '<span>Unlimited downloads</span> in TXT format.', enabled: true },
  { text: 'Unlimited downloads as <span>PDF or Word</span> file.', enabled: true },
  { text: '<span>CV Check™</span> to scan your CV for issues and suggest improvements.', enabled: true },
];

export const FeaturesSection: React.FC = () => {
  return (
    <Section>
      <Container>
        <ContentBox>
          <Heading>
            Create your perfect CV for <span>free</span> or take advantage of
            the full <span>premium</span> feature set
          </Heading>

          <StatsList>
            <StatItem>
              <ArrowUp size={16} />
              <span>
                {SOCIAL_PROOF_STATS.jobLandingBoost}% more likely to land a job
              </span>
            </StatItem>
            <StatItem>
              <ArrowUp size={16} />
              <span>
                {SOCIAL_PROOF_STATS.recruiterResponseBoost}% boost in recruiter
                response rate
              </span>
            </StatItem>
          </StatsList>

          <PlansContainer>
            <PlanCard $type="basic">
              <PlanBadge>BASIC ACCESS</PlanBadge>
              <PlanContent>
                <PriceSection>
                  <Price>Free</Price>
                  <PriceDescription>
                    <span>Create your CV and cover letter for free.</span>
                    {'\n'}Access free tools to start building your CV and cover
                    letter today.
                  </PriceDescription>
                </PriceSection>

                <FeaturesContainer>
                  <FeatureSection>
                    {basicFeatures.map((feature, index) => (
                      <FeatureItem key={index} $enabled={feature.enabled}>
                        {feature.enabled ? (
                          <Check size={16} />
                        ) : (
                          <Lock size={16} />
                        )}
                        <FeatureText
                          dangerouslySetInnerHTML={{ __html: feature.text }}
                        />
                      </FeatureItem>
                    ))}
                  </FeatureSection>
                </FeaturesContainer>
              </PlanContent>
            </PlanCard>

            <PlanCard $type="premium">
              <PlanBadge>PREMIUM PLAN</PlanBadge>
              <PlanContent>
                <PriceSection>
                  <Price>Free*</Price>
                  <PriceDescription>
                    <span>All features unlocked</span>
                    {'\n'}Everything you need to create the perfect CV and land
                    your dream job.
                  </PriceDescription>
                </PriceSection>

                <FeaturesContainer>
                  <FeatureSection>
                    {premiumFeatures.map((feature, index) => (
                      <FeatureItem key={index} $enabled={feature.enabled}>
                        <Check size={16} />
                        <FeatureText
                          dangerouslySetInnerHTML={{ __html: feature.text }}
                        />
                      </FeatureItem>
                    ))}
                  </FeatureSection>
                </FeaturesContainer>
              </PlanContent>
            </PlanCard>
          </PlansContainer>

          <FooterContent>
            <Disclaimer>
              *Based on survey responses shared by{' '}
              {SOCIAL_PROOF_STATS.surveySample.toLocaleString()} job seekers
            </Disclaimer>

            <ButtonWrapper>
              <Button href="/build-cv" variant="primary" size="large">
                Start a new CV
              </Button>
              <Button href="/build-cv" variant="secondary" size="large">
                Upload my CV
              </Button>
            </ButtonWrapper>
          </FooterContent>
        </ContentBox>
      </Container>
    </Section>
  );
};

export default FeaturesSection;
