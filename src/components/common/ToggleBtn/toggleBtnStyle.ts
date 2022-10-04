import styled, { css } from "styled-components";

const ToggleBox = styled.div`
  width: 550px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ToggleBtn = styled.button<{ on: string }>`
  z-index: 10;
  height: 61px;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.2rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey);
  border-radius: 10px 10px 0 0;
  border-bottom-color: var(--color-white);
  ${({ on }) => {
    if (on === "false") {
      return css`
        z-index: 0;
        padding: 19px 0 37px;
        background-color: var(--color-brightGrey);
        color: var(--color-black);
      `;
    }
  }}
`;

export { ToggleBox, ToggleBtn };
