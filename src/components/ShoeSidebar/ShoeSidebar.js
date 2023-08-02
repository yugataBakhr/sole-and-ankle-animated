import React from "react";
import styled, { keyframes } from "styled-components/macro";

import { WEIGHTS } from "../../constants";

const shoeTypes = [
  { href: "/lifestyle", type: "Lifestyle" },
  { href: "/jordan", type: "Jordan" },
  { href: "/running", type: "Running" },
  { href: "/basketball", type: "Basketball" },
  { href: "/training", type: "Training & Gym" },
  { href: "/football", type: "Football" },
  { href: "/skateboarding", type: "Skateboarding" },
  { href: "/us-football", type: "American Football" },
  { href: "/baseball", type: "Baseball" },
  { href: "/golf", type: "Golf" },
  { href: "/tennis", type: "Tennis" },
  { href: "/athletics", type: "Athletics" },
  { href: "/walking", type: "Walking" },
];

const Sidebar = () => {
  return (
    <Wrapper>
      {shoeTypes.map((item, index) =>
        index !== 2 ? (
          <LinkContainer key={item.type}>
            <Link
              href={item.href}
              key={item.type}
              data-hover={item.type}
            >
              {item.type}
            </Link>
          </LinkContainer>
        ) : (
          <LinkContainer key={item.type}>
            <ActiveLink
              href={item.href}
              key={item.type}
              data-hover={item.type}
            >
              {item.type}
            </ActiveLink>
          </LinkContainer>
        )
      )}
    </Wrapper>
  );
};

//keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.aside``;

const Link = styled.span`
  display: inline-block;
  position: relative;
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
  line-height: 2;

  @media (prefers-reduced-motion: no-preference) {
    transform-origin: 50% 0;
    transform-style: preserve-3d;
    transition: 800ms linear;

    &::before {
      content: attr(data-hover);
      position: absolute;
      top: 100%;
      left: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: inherit;
      width: 100%;
      height: 100%;
      opacity: 0;
      font-weight: ${WEIGHTS.bold};
      transform: rotateX(-90deg);
      transform-origin: 50% 0;
      transition: transform 800ms linear;
    }
  }
`;

const ActiveLink = styled(Link)`
  color: var(--color-primary);
`;

const LinkContainer = styled.a`
  display: flex;
  flex-direction: column;
  position: relative;
  text-decoration: none;
  cursor: pointer;

  @media (prefers-reduced-motion: no-preference) {
    perspective: 1000px;

    &:hover,
    &:focus {
      ${Link} {
        transform: rotateX(90deg) translateY(24px);
        transition: transform 400ms linear;
      }
      ${Link}::before {
        animation: ${fadeIn} 400ms linear forwards;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover,
    &:focus {
      ${Link} {
        font-weight: ${WEIGHTS.bold};
      }
    }
  }
`;

export default Sidebar;
