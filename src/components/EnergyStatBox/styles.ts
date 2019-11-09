import styled, { keyframes } from "styled-components";
import breakpoint from "styled-components-breakpoint";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

interface StatBoxProps {
  animationIndex?: number
}

export const StatBox = styled.article<StatBoxProps>`
  --width: 8;
  --columns: 9;
  --gap: calc((var(--columns) - var(--width)) * 1%);
  --boxBasis: calc(var(--width) / var(--columns) * 100%);
  flex-basis: calc(var(--boxBasis) - var(--gap));
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  margin-bottom: .7em;
  border: 1px solid #e8e9ed;
  padding: 1rem;
  opacity: 0;
  animation: ${fadeIn} .7s ease-out forwards;
  animation-delay: ${({ animationIndex }) => animationIndex ? animationIndex * 0.3 : 0}s;

  ${breakpoint('tablet')`
    --width: 4;
    margin-bottom: calc(var(--gap) / 2);
  `}
  
  ${breakpoint('desktop')`
    --width: 3;
  `}
`;

export const ChartWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 30%;

  p {
    margin: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-family: Roboto;
    color: #525454;
    font-size: 1rem;
  }
`;

export const TextWrapper = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: space-around;
  flex-direction: column;
  text-align: right;
  height: 100%;

  h1 {
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
    font-weight: normal;
    font-size: 3rem;
    color: #27CFDB;
  }
  h2 {
    margin: 0;
    font-family: Bookman;
    color: #aaaaaa;
    font-weight: normal;
  }
`;
