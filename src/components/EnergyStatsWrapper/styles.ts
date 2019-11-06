import styled from 'styled-components';
import breakpoint from "styled-components-breakpoint";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  --sidePadding: 3rem;
  --topBottomPadding: 1rem;
  padding: var(--topBottomPadding) var(--sidePadding);
  box-sizing: border-box;
  height: inherit;

  ${breakpoint('tablet')`
    --sidePadding: 5rem;
    --topBottomPadding: 1.5rem;
  `}
  
  ${breakpoint('desktop')`
    --sidePadding: 7rem;
    --topBottomPadding: 2rem;
  `}
`;
