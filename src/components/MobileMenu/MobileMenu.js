/* eslint-disable no-unused-vars */
import React from "react";
import styled, { keyframes } from "styled-components/macro";
import { DialogOverlay, DialogContent } from "@reach/dialog";

import { QUERIES, WEIGHTS } from "../../constants";

import UnstyledButton from "../UnstyledButton";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

const navigationLinks = [
  { href: "/sale", type: "Sale" },
  { href: "/new", type: "New\u00A0Release" },
  { href: "/men", type: "Men" },
  { href: "/women", type: "Women" },
  { href: "/kids", type: "Kids" },
  { href: "/collections", type: "Collections" },
];

const footerLinks = [
  { href: "/terms", type: "Terms and Conditions" },
  { href: "/privacy", type: "Privacy Policy" },
  { href: "/contact", type: "Contact Us" },
];

const MobileMenu = ({ isOpen, onDismiss }) => {
  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Content aria-label="Menu">
        <CloseButton onClick={onDismiss} cue={navigationLinks.length}>
          <Icon id="close" />
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>
        <Filler />
        <Nav>
          {navigationLinks.map((item, index) => (
            <NavLinkWrapper
              index={index}
              href={item.href}
              key={item.type}
            >
              <NavLink
                index={index}
                key={item.type}
                data-hover={item.type}
              >
                {item.type}
              </NavLink>
            </NavLinkWrapper>
          ))}
        </Nav>
        <Footer>
          {footerLinks.map((item) => (
            <SubLink
              href={item.href}
              key={item.type}
              data-hover={item.type}
              cue={navigationLinks.length}
            >
              {item.type}
            </SubLink>
          ))}
        </Footer>
      </Content>
    </Overlay>
  );
};

//keyframes
const overlayFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentFadeIn = keyframes`
  from {
    transform: translateX(300px) rotateY(-90deg) scale(0.7, 0.7);
  }
  to {
    transform: translateX(0px) rotateY(0deg) scale(1, 1);
  }
`;

const NavLinkFadeIn = keyframes`
  from {
    transform: translateX(0px);
    opacity: 0;
  }
  to {
    transform: translateX(-200px);
    opacity: 1;
  }
`;

const elementShowUp = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const customTimingFunction = "cubic-bezier(0.35, 0.89, 0.71, 0.92)";

// Tweak those values to quickly change the orchestration time.
const durationTime = "400ms";
const delayTime = "400ms";

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-backdrop);
  display: flex;
  justify-content: flex-end;

  @media (prefers-reduced-motion: no-preference) {
    perspective: 1000px;
    --animation-duration: ${durationTime};
    animation: ${overlayFadeIn} both;
    animation-duration: var(--animation-duration);
  }
`;

const Content = styled(DialogContent)`
  background: white;
  width: 300px;
  height: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;

  @media (prefers-reduced-motion: no-preference) {
    --transition-timing-function: ${customTimingFunction};
    --animation-duration: ${durationTime};
    --animation-delay: ${delayTime};
    transform-style: preserve-3d;
    animation: ${contentFadeIn} both;
    animation-duration: var(--animation-duration);
    animation-timing-function: var(--transition-timing-function);
    animation-delay: var(--animation-delay);
  }
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;

  @media (prefers-reduced-motion: no-preference) {
    --animation-duration: ${durationTime};
    // This is the minimal delay time.
    --animation-delay-base: calc(${delayTime} * 2);
    // There has to be some additional delay time.
    // those codes below to calculate the exact time to wait.
    --animation-additional-delay-time: calc(
      ${(props) => props.cue * 100}ms + ${durationTime}
    );
    animation: ${elementShowUp} both;
    animation-duration: var(--animation-duration);
    animation-delay: calc(
      var(--animation-delay-base) +
        var(--animation-additional-delay-time)
    );
  }
`;

const NavLinkWrapper = styled.a`
  position: relative;
  width: fit-content;
  text-decoration: none;
  --color: ${(props) =>
    props.index === 0
      ? "var(--color-secondary)"
      : "var(--color-gray-900)"};
  color: var(--color);
  transform-style: preserve-3d;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (prefers-reduced-motion: no-preference) {
    position: relative;
  }
`;

const NavLink = styled.span`
  display: inline-block;
  color: inherit;
  font-weight: ${WEIGHTS.medium};
  font-size: 1.125rem;
  text-transform: uppercase;
  visibility: hidden;

  @media (prefers-reduced-motion: no-preference) {
    &::before {
      content: attr(data-hover);
      position: absolute;
      top: 0;
      left: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      --animation-duration: ${durationTime};
      animation: ${NavLinkFadeIn} both;
      animation-duration: var(--animation-duration);
      --animation-timing-function: ${customTimingFunction};
      animation-timing-function: var(--animation-timing-function);
      --animation-delay-base: calc(${delayTime} * 2);
      --animation-delay: ${(props) =>
        props.index === 0
          ? "var(--animation-delay-base)"
          : `calc(var(--animation-delay-base) + ${
              props.index * 100
            }ms)`};
      animation-delay: var(--animation-delay);
      visibility: visible;
    }
  }
`;

const Filler = styled.div`
  flex: 1;
`;
const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;

  @media (prefers-reduced-motion: no-preference) {
    --animation-duration: ${durationTime};
    --animation-delay-base: ${delayTime} * 2;
    --animation-additional-delay-time: calc(
      ${(props) => props.cue * 100}ms + ${durationTime}
    );
    animation: ${elementShowUp} both;
    animation-duration: var(--animation-duration);
    animation-delay: calc(
      var(--animation-delay-base) +
        var(--animation-additional-delay-time)
    );
  }
`;

export default MobileMenu;
