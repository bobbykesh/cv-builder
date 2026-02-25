'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useUIStore } from '@/store/uiStore';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { NAV_LINKS } from '@/lib/utils/constants';
import { media } from '@/styles/breakpoints';

const HeaderWrapper = styled.header`
  padding: 20px 0;
  background-color: ${({ theme }) => theme.colors.background};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
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

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-shadow: ${({ theme }) => theme.shadows.md};

  ${media.md} {
    display: flex;
    flex-direction: row;
    position: static;
    padding: 0;
    border-bottom: none;
    box-shadow: none;
    gap: 30px;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;

  ${media.md} {
    flex-direction: row;
    align-items: center;
    gap: 25px;
  }
`;

const NavItem = styled.li``;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.accent : theme.colors.text};
  text-decoration: none;
  letter-spacing: 0.5px;
  transition: color ${({ theme }) => theme.transitions.fast};
  display: block;
  padding: 8px 0;

  ${media.md} {
    padding: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: ${({ theme }) => theme.colors.text};

  ${media.md} {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CTAButton = styled(Link)`
  display: none;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textWhite};
  background-color: ${({ theme }) => theme.colors.accent};
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${media.md} {
    display: inline-block;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentDark};
  }
`;

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();

  // Close mobile menu when route changes
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  // Don't show full nav on builder pages
  const isBuilderPage = pathname?.startsWith('/build-');
  const isDashboardPage = pathname?.startsWith('/dashboard');

  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <Logo />

          {!isBuilderPage && (
            <>
              <Nav $isOpen={isMobileMenuOpen}>
                <NavList>
                  {NAV_LINKS.map((link) => (
                    <NavItem key={link.href}>
                      <NavLink
                        href={link.href}
                        $isActive={pathname === link.href}
                      >
                        {link.label}
                      </NavLink>
                    </NavItem>
                  ))}
                </NavList>
              </Nav>

              <RightSection>
                <CTAButton href="/build-cv">Build CV</CTAButton>

                {isMobile && (
                  <MenuButton
                    onClick={toggleMobileMenu}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </MenuButton>
                )}
              </RightSection>
            </>
          )}

          {isBuilderPage && (
            <RightSection>
              <NavLink href="/dashboard" $isActive={isDashboardPage || false}>
                My CVs
              </NavLink>
            </RightSection>
          )}
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
