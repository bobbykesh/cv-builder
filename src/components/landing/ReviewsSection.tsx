'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { media } from '@/styles/breakpoints';

const Section = styled.section`
  border-radius: 0 0 120px 0;
  background: ${({ theme }) => theme.colors.background};
  padding: 80px 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    width: 90px;
    height: 90px;
    bottom: 0;
    position: absolute;
    display: block;
  }

  &::before {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &::after {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 0 0 0 90px;
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

const ContentBox = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3.2rem;
  line-height: 4rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 30px;

  ${media.md} {
    font-size: 4.6rem;
    line-height: 5.8rem;
  }
`;

const TrustpilotBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px 35px;
  margin-bottom: 40px;
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;

  svg {
    fill: #00b67a;
    color: #00b67a;
  }
`;

const ReviewCount = styled.p`
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-weight: 700;

  span {
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 24px;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 24px;
  min-width: 100%;
  transition: transform 0.5s ease;
`;

const ReviewCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  padding: 30px;
  border-radius: 30px;
  flex: 1;
  min-width: 250px;

  ${media.lg} {
    min-width: 0;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 20px;
`;

const CardStars = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 10px;

  svg {
    fill: #00b67a;
    color: #00b67a;
    width: 16px;
    height: 16px;
  }
`;

const CardName = styled.p`
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const CardTime = styled.p`
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const CardContent = styled.div``;

const CardTitle = styled.a`
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  display: block;
  margin-bottom: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const CardComment = styled.p`
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.colors.text};
`;

const NavButton = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $direction }) => ($direction === 'left' ? 'left: -25px;' : 'right: -25px;')}
  width: 50px;
  height: 50px;
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

  ${media.lg} {
    display: flex;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.accentDark};
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.secondaryLight : theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};
`;

const reviews = [
  {
    id: 1,
    name: 'Tony Monroe',
    time: 'about a month ago',
    title: 'Great CV builder',
    comment: 'Easy to use site with nice features. Customer service via telephone was excellent.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    time: 'about a month ago',
    title: 'Best services ever',
    comment: 'Best services ever. Resume made easy and perfect. 100% ATS friendly.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ameer Hamza',
    time: '26 days ago',
    title: 'Extremely helpful',
    comment: "I can't even explain how helpful their customer service was. Had great experience.",
    rating: 5,
  },
  {
    id: 4,
    name: 'Trishana Hill',
    time: '11 days ago',
    title: 'My Perfect CV is amazing',
    comment: 'The best and most economical CV writing service that is guaranteed to work.',
    rating: 5,
  },
];

export const ReviewsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(reviews.length / 4);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <Section>
      <Container>
        <ContentBox>
          <Heading>Check out our latest reviews</Heading>

          <TrustpilotBar>
            <Stars>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={24} />
              ))}
            </Stars>
            <ReviewCount>
              based on <span>2,847 reviews</span> on Trustpilot
            </ReviewCount>
          </TrustpilotBar>
        </ContentBox>

        <CarouselWrapper>
          <NavButton $direction="left" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </NavButton>

          <CardsContainer>
            <CardWrapper
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review) => (
                <ReviewCard key={review.id}>
                  <CardHeader>
                    <CardStars>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} />
                      ))}
                    </CardStars>
                    <CardName>{review.name}</CardName>
                    <CardTime>{review.time}</CardTime>
                  </CardHeader>
                  <CardContent>
                    <CardTitle href="#">{review.title}</CardTitle>
                    <CardComment>{review.comment}</CardComment>
                  </CardContent>
                </ReviewCard>
              ))}
            </CardWrapper>
          </CardsContainer>

          <NavButton $direction="right" onClick={nextSlide}>
            <ChevronRight size={24} />
          </NavButton>
        </CarouselWrapper>

        <Dots>
          {Array.from({ length: totalSlides }).map((_, i) => (
            <Dot
              key={i}
              $active={i === currentSlide}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </Dots>
      </Container>
    </Section>
  );
};

export default ReviewsSection;
