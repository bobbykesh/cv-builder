'use client';

import React from 'react';
import styled from 'styled-components';
import { media } from '@/styles/breakpoints';

const Section = styled.section`
  position: relative;
  padding: 30px 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 0 120px 0 0;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 120px;
    top: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
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
  padding-bottom: 17px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PartnerList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px 25px;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  padding-bottom: 33px;

  ${media.xl} {
    gap: 5px 25px;
    flex-wrap: nowrap;
    justify-content: space-around;
  }
`;

const ListHeading = styled.li`
  width: 100%;
  text-align: center;
  font-size: 1.8rem;
  line-height: 3.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};

  ${media.lg} {
    width: auto;
    padding: 0 20px;
  }
`;

const PartnerItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PartnerLogo = styled.div`
  width: 80px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textLight};

  ${media.md} {
    width: 100px;
    height: 35px;
  }
`;

const Disclaimer = styled.p`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.2rem;
  line-height: 2.8rem;
  color: ${({ theme }) => theme.colors.textLight};
  white-space: nowrap;
`;

const partners = [
  { id: 'google', name: 'Google' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'apple', name: 'Apple' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'meta', name: 'Meta' },
  { id: 'netflix', name: 'Netflix' },
  { id: 'spotify', name: 'Spotify' },
];

export const PartnerBar: React.FC = () => {
  return (
    <Section>
      <Container>
        <Content>
          <PartnerList>
            <ListHeading>Our customers have been hired at:</ListHeading>
            {partners.map((partner) => (
              <PartnerItem key={partner.id}>
                <PartnerLogo>{partner.name}</PartnerLogo>
              </PartnerItem>
            ))}
            <Disclaimer>
              PerfectCV is not affiliated to these companies.
            </Disclaimer>
          </PartnerList>
        </Content>
      </Container>
    </Section>
  );
};

export default PartnerBar;
