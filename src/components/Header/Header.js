import React from "react";
import styled, { keyframes } from "styled-components/macro";

/* Note to self */
/* Exercise 2's stretch goal challenge is in ShoeSidebar */

import { QUERIES, WEIGHTS } from "../../constants";
import Logo from "../Logo";
import Icon from "../Icon";
import UnstyledButton from "../UnstyledButton";
import SuperHeader from "../SuperHeader";
import MobileMenu from "../MobileMenu";
import VisuallyHidden from "../VisuallyHidden";

const navData = [
  { href: "/sale", name: "Sale" },
  { href: "/new", name: "Releases" },
  { href: "/men", name: "Men" },
  { href: "/women", name: "Women" },
  { href: "/kids", name: "Kids" },
  { href: "/collections", name: "Collections" },
];

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <DesktopNav>
          {navData.map((nav, index) => (
            <NavLinkContainer key={nav.name}>
              <NavLink
                key={nav.name}
                href={nav.href}
                isFirst={index === 0}
              >
                {nav.name}
              </NavLink>
              <NavLinkFocused
                key={nav.name + "-hidden"}
                href={nav.href}
                isFirst={index === 0}
              >
                {nav.name}
              </NavLinkFocused>
            </NavLinkContainer>
          ))}
        </DesktopNav>
        <MobileActions>
          <ShoppingBagButton>
            <Icon id="shopping-bag" />
            <VisuallyHidden>Open cart</VisuallyHidden>
          </ShoppingBagButton>
          <UnstyledButton>
            <Icon id="search" />
            <VisuallyHidden>Search</VisuallyHidden>
          </UnstyledButton>
          <UnstyledButton onClick={() => setShowMobileMenu(true)}>
            <Icon id="menu" />
            <VisuallyHidden>Open menu</VisuallyHidden>
          </UnstyledButton>
        </MobileActions>
        <Filler />
      </MainHeader>

      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
      />
    </header>
  );
};

const MainHeader = styled.div`
  display: flex;
  align-items: baseline;
  padding: 18px 32px;
  border-bottom: 1px solid var(--color-gray-300);
  overflow: auto;

  @media ${QUERIES.tabletAndSmaller} {
    justify-content: space-between;
    align-items: center;
    border-top: 4px solid var(--color-gray-900);
  }

  @media ${QUERIES.phoneAndSmaller} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: clamp(1rem, 9.2vw - 4.5rem, 3.5rem);
  margin: 0px 48px;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const MobileActions = styled.div`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 32px;
    display: flex;
  }

  @media ${QUERIES.phoneAndSmaller} {
    gap: 16px;
  }
`;

const LogoWrapper = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    flex: revert;
  }
`;

const ShoppingBagButton = styled(UnstyledButton)`
  transform: translateX(-2px);
`;

const Filler = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

// keyframes
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const fadeOutBack = keyframes`
  from {
    opacity: revert;
    transform: translateY(-100%);
  }
  to {
    opacity: revert;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(0);
  }
  to {
    opacity: 1;
    transform: translateY(-100%);
  }
`;

const NavLink = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${(props) =>
    props.isFirst
      ? "var(--color-secondary)"
      : "var(--color-gray-900)"};
  font-weight: ${WEIGHTS.medium};
  animation: ${fadeOutBack} 800ms ease-out;
  animation-fill-mode: forwards;
`;

const NavLinkFocused = styled.a`
  position: absolute;
  top: 100%;
  opacity: 0;
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${(props) =>
    props.isFirst
      ? "var(--color-secondary)"
      : "var(--color-gray-900)"};
  font-weight: ${WEIGHTS.bold};
`;

const NavLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &:hover,
  &:focus {
    @media (prefers-reduced-motion: no-preference) {
      ${NavLink} {
        animation: ${fadeOut} 400ms ease-in;
        animation-fill-mode: forwards;
      }
      ${NavLinkFocused} {
        animation: ${fadeIn} 400ms ease-out;
        animation-fill-mode: forwards;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      ${NavLink}, ${NavLinkFocused} {
        font-weight: ${WEIGHTS.bold};
      }
    }
  }
`;

export default Header;
