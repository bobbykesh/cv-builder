'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { FOOTER_LINKS } from '@/lib/utils/constants';
import { media } from '@/styles/breakpoints';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundFooter};
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 1.2rem;
  line-height: 1.8rem;
  position: relative;
  padding: 20px 0;
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

const FooterContent = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  text-align: center;
  gap: 20px;

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const Copyright = styled.span`
  font-size: 1rem;
`;

const ServiceDetails = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  ${media.md} {
    flex-direction: row;
    gap: 10px;
  }

  svg {
    fill: ${({ theme }) => theme.colors.textWhite};
    width: 14px;
    height: 14px;
  }

  a {
    color: ${({ theme }) => theme.colors.textWhite};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FooterLinks = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundFooter};
  padding: 15px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;

  ${media.md} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const LinkItem = styled.li`
  a {
    padding: 0 10px;
    letter-spacing: 1.3px;
    font-size: 1rem;
    line-height: 1.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textWhite};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ${media.md} {
    &:not(:last-child) a {
      border-right: 1px solid ${({ theme }) => theme.colors.textWhite};
    }
  }
`;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <FooterLinks>
        <Container>
          <LinkList>
            {FOOTER_LINKS.map((link) => (
              <LinkItem key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </LinkItem>
            ))}
          </LinkList>
        </Container>
      </FooterLinks>

      <FooterWrapper>
        <Container>
          <FooterContent>
            <Copyright>© {currentYear}, PerfectCV. All rights reserved.</Copyright>

            <ServiceDetails>
              <span>Customer Service</span>
              <Phone size={14} />
              <a href="tel:08081890676" title="Phone">
                0808 189 0676
              </a>
              <span>Mon-Sun 09:00-21:00</span>
            </ServiceDetails>
          </FooterContent>
        </Container>
      </FooterWrapper>
    </>
  );
};

export default Footer;
