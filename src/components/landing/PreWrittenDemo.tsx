'use client';

import React from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import { media } from '@/styles/breakpoints';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.accentLight};
  padding: 60px 0;
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
  gap: 40px;

  ${media.md} {
    flex-direction: row;
    gap: 97px;
  }
`;

const TextContent = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textDark};

  ${media.md} {
    width: 48.8%;
    text-align: left;
  }
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3.2rem;
  line-height: 4rem;
  margin-bottom: 20px;

  ${media.md} {
    font-size: 4.6rem;
    line-height: 5.8rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.6rem;
  line-height: 2.4rem;

  ${media.md} {
    font-size: 2rem;
    line-height: 3rem;
  }
`;

const DemoBox = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 11px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 11px;
  width: 100%;
  max-width: 340px;

  ${media.md} {
    width: calc(100% - 48.8%);
    max-width: none;
  }
`;

const SearchBox = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  flex: 1;
  font-weight: 700;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 1.4rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDark};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  background: #f8d4ca;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #be4833;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: #f0c0b0;
  }
`;

const BulletList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 11px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BulletItem = styled.li<{ $highlight?: boolean }>`
  display: flex;
  gap: 0;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 10px;
  overflow: hidden;
  width: ${({ $highlight }) => ($highlight ? '100%' : '85%')};
  margin: 0 auto;
`;

const ActionTag = styled.div<{ $type: 'add' | 'remove' }>`
  background-color: ${({ $type, theme }) =>
    $type === 'add' ? theme.colors.accent : theme.colors.accentLight};
  color: ${({ theme }) => theme.colors.textWhite};
  padding: 15px 8px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 31px;
`;

const BulletText = styled.div`
  flex: 1;
  padding: 15px 15px 15px 12px;
  font-size: 1.3rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: none;
  border-radius: 0 10px 10px 0;

  ${media.md} {
    font-size: 1.4rem;
    line-height: 2.1rem;
  }
`;

const bullets = [
  {
    type: 'add' as const,
    text: 'Developed design deliverables that elevated and differentiated the brand.',
    highlight: false,
  },
  {
    type: 'remove' as const,
    text: 'Maintained consistent use of graphic imagery in materials and other marketing outreach.',
    highlight: true,
  },
  {
    type: 'add' as const,
    text: 'Designed new on-brand visual elements to effectively convey concepts and messaging.',
    highlight: false,
  },
];

export const PreWrittenDemo: React.FC = () => {
  return (
    <Section>
      <Container>
        <Content>
          <TextContent>
            <Heading>Insert our pre-written CV content</Heading>
            <SubHeading>No writing required - just point and click.</SubHeading>
          </TextContent>

          <DemoBox>
            <SearchBox>
              <SearchInput
                type="search"
                placeholder="Ex: Graphic Art and Design"
                readOnly
              />
              <SearchButton>
                <Search size={18} />
              </SearchButton>
            </SearchBox>

            <BulletList>
              {bullets.map((bullet, index) => (
                <BulletItem key={index} $highlight={bullet.highlight}>
                  <ActionTag $type={bullet.type}>
                    {bullet.type === 'add' ? 'Add' : 'Remove'}
                  </ActionTag>
                  <BulletText>{bullet.text}</BulletText>
                </BulletItem>
              ))}
            </BulletList>
          </DemoBox>
        </Content>
      </Container>
    </Section>
  );
};

export default PreWrittenDemo;
