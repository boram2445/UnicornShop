import styled, { css } from "styled-components";

const Container = styled.div`
  position: absolute;
  margin-top: 0.8rem;
  width: 13rem;
  padding: 0.8rem;
  border: var(--color-brightGrey) solid 1px;
  border-radius: 1rem;
  background-color: var(--color-white);
  box-shadow: var(--shadow-dark);
  z-index: 100;
`;

const Arrows = styled.div<{ type: string }>`
  position: absolute;
  height: 0;
  width: 0;
  left: 50%;
  transform: translateX(-50%);
  border: transparent solid;
  border-width: 0.8rem;
  ${({ type }) => {
    if (type === "arrow") {
      return css`
        border-bottom-color: var(--color-white);
        top: -15px;
      `;
    }
    if (type === "border") {
      return css`
        border-bottom-color: var(--color-brightGrey);
        top: -16px;
      `;
    }
  }}
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalBtn = styled.button`
  padding: 1rem 0;
  font-size: 1.4rem;
  border-radius: 1rem;
  &:hover {
    background-color: var(--color-brightGrey);
  }
`;

export { Container, Arrows, BtnWrap, ModalBtn };
