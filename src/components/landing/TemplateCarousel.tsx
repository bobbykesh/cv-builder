'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '@/components/shared';
import { TEMPLATES } from '@/types/template';
import { media } from '@/styles/breakpoints';

const Section = styled.section`
  padding: 60px 0 80px;
  background-color: ${({ theme }) => theme.colors.background};
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

const ContentBox = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3.2rem;
  line-height: 4rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;

  ${media.md} {
    font-size: 4.6rem;
    line-height: 5.8rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  ${media.md} {
    font-size: 2rem;
    line-height: 3rem;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

const CarouselContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 20px 0;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.md} {
    gap: 30px;
  }
`;

const TemplateCard = styled.div`
  flex: 0 0 280px;
  scroll-snap-align: center;
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.normal};

  ${media.md} {
    flex: 0 0 320px;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-5px);

    .overlay {
      opacity: 1;
    }
  }
`;

const TemplatePreview = styled.div`
  aspect-ratio: 8.5/11;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const PreviewHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const PreviewPhoto = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
`;

const PreviewName = styled.div`
  flex: 1;
`;

const PreviewLine = styled.div<{ $width?: string; $height?: string; $color?: string }>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '6px'};
  background: ${({ theme, $color }) => $color || theme.colors.border};
  border-radius: 3px;
  margin-bottom: 4px;
`;

const PreviewSection = styled.div`
  margin-bottom: 12px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 45, 107, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.normal};
`;

const PreviewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const UseTemplateLink = styled(Link)`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textWhite};
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.accentDark};
  }
`;

const TemplateName = styled.div`
  padding: 15px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const NavButton = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $direction }) => ($direction === 'left' ? 'left: -15px;' : 'right: -15px;')}
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  border: none;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textWhite};
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 2;

  ${media.md} {
    display: flex;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.accentDark};
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

export const TemplateCarousel: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 350;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Section>
      <Container>
        <ContentBox>
          <Heading>Top professional templates for a perfect CV</Heading>
          <SubHeading>
            30+ expert-designed CV templates to choose from. Optimised to impress
            recruiters and pass ATS. One-click layouts - no formatting necessary.
          </SubHeading>
        </ContentBox>

        <CarouselWrapper>
          <NavButton $direction="left" onClick={() => scroll('left')}>
            <ChevronLeft size={24} />
          </NavButton>

          <CarouselContainer ref={containerRef}>
            {TEMPLATES.map((template) => (
              <TemplateCard key={template.id}>
                <TemplatePreview>
                  <PreviewHeader>
                    <PreviewPhoto />
                    <PreviewName>
                      <PreviewLine $width="80%" $height="8px" $color={template.colors[0]} />
                      <PreviewLine $width="60%" $height="6px" />
                    </PreviewName>
                  </PreviewHeader>
                  <PreviewSection>
                    <PreviewLine $width="40%" $height="8px" $color={template.colors[0]} />
                    <PreviewLine $width="100%" />
                    <PreviewLine $width="90%" />
                    <PreviewLine $width="95%" />
                  </PreviewSection>
                  <PreviewSection>
                    <PreviewLine $width="35%" $height="8px" $color={template.colors[0]} />
                    <PreviewLine $width="100%" />
                    <PreviewLine $width="85%" />
                  </PreviewSection>
                  <PreviewSection>
                    <PreviewLine $width="30%" $height="8px" $color={template.colors[0]} />
                    <PreviewLine $width="50%" />
                    <PreviewLine $width="40%" />
                  </PreviewSection>
                </TemplatePreview>

                <Overlay className="overlay">
                  <PreviewButton>
                    <ZoomIn size={18} />
                    Preview Template
                  </PreviewButton>
                  <UseTemplateLink href={`/build-cv?template=${template.id}`}>
                    Use this template
                  </UseTemplateLink>
                </Overlay>

                <TemplateName>{template.name}</TemplateName>
              </TemplateCard>
            ))}
          </CarouselContainer>

          <NavButton $direction="right" onClick={() => scroll('right')}>
            <ChevronRight size={24} />
          </NavButton>
        </CarouselWrapper>

        <ButtonWrapper>
          <Button href="/build-cv" variant="outline" size="large">
            Build my CV
          </Button>
        </ButtonWrapper>
      </Container>
    </Section>
  );
};

export default TemplateCarousel;
