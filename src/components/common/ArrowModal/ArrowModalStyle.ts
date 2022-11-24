import styled, { css } from "styled-components";

const Container = styled.div<{ on: string }>`
  display: ${({ on }) => (on === "true" ? "block" : "none")};
  position: absolute;
  top: 60px;
  left: -38px;
  margin-top: 8px;
  width: 130px;
  padding: 8px;
  border: var(--color-grey) solid 1px;
  border-radius: 10px;
  background-color: var(--color-white);
  box-shadow: 0px 8px 10px 0px #87878714;
  z-index: 100;
`;

const Arrows = styled.div<{ type: string }>`
  position: absolute;
  height: 0;
  width: 0;
  border-style: solid;
  left: 50%;
  transform: translateX(-50%);
  border-color: transparent;
  border-width: 8px;
  ${({ type }) => {
    if (type === "arrow") {
      return css`
        border-bottom-color: var(--color-white);
        top: -15px;
      `;
    }
    if (type === "border") {
      return css`
        border-bottom-color: var(--color-grey);
        top: -16px;
      `;
    }
  }}
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export { Container, Arrows, BtnWrap };
