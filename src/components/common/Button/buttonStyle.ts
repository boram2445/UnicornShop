import styled, { css } from "styled-components";

interface NormalBtnProps {
  fontSize?: string;
  fontWeight?: string;
  width?: string;
  padding?: string;
  color?: string;
  icon?: string;
  on?: string;
  tab?: string;
}

const NormalBtn = styled.button<NormalBtnProps>`
  width: ${({ width }) => (width ? width : "100%")};
  padding: ${({ padding }) => (padding ? padding : "10px 0")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.8rem")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "400")};
  background-color: var(--color-main);
  color: var(--color-white);
  line-height: 2.2rem;
  border-radius: 5px;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    background-color: var(--color-grey);
    cursor: default;
    &:hover {
      opacity: 1;
    }
  }
  ${({ icon }) => {
    if (icon) {
      return css`
        display: flex;
        align-items: center;
        gap: 8px;
      `;
    }
  }}

  ${({ color }) => {
    if (color === "white") {
      return css`
        background-color: var(--color-white);
        color: var(--color-darkGrey);
        border: var(--color-grey) 1px solid;
        &:hover {
          color: var(--color-black);
          border-color: var(--color-black);
        }
      `;
    }
    if (color === "dark") {
      return css`
        background-color: var(--color-darkGrey);
        color: var(--color-white);
      `;
    }
  }}
  ${({ color, on }) => {
    if (color === "white" && on === "true") {
      return css`
        background-color: var(--color-main);
        color: var(--color-white);
        border: none;
        &:hover {
          border-color: var(--color-main);
          color: var(--color-white);
          opacity: 0.9;
        }
      `;
    }
  }}
  
  ${({ tab }) => {
    if (tab === "true") {
      return css`
        width: 100%;
        padding: 19px 0 12px;
        border-radius: 0;
        color: var(--color-darkGrey);
        border-bottom: var(--color-grey) 6px solid;
        background-color: var(--color-white);
        cursor: pointer;
      `;
    }
  }}
  ${({ tab, on }) => {
    if (tab === "true" && on === "true") {
      return css`
        background-color: var(--color-white);
        color: var(--color-main);
        border-bottom: var(--color-main) 6px solid;
      `;
    }
  }}
`;

const TabMenuBtn = styled.button<{ fixed?: string }>`
  position: relative;
  width: 250px;
  padding: 15px 20px 15px;
  text-align: start;
  color: var(--color-black);
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2rem;
  border-radius: 5px;
  ${({ fixed }) => {
    if (fixed === "true") {
      return css`
        background-color: var(--color-main);
        color: var(--color-white);
        cursor: default;
      `;
    } else {
      return css`
        &:hover {
          background-color: var(--color-brightPink);
        }
      `;
    }
  }}
`;

const NumCircle = styled.div`
  position: absolute;
  right: 20px;
  display: inline-block;
  text-align: center;
  width: 20px;
  height: 20px;
  color: var(--color-white);
  background-color: var(--color-red);
  border-radius: 50%;
`;

export { NormalBtn, TabMenuBtn, NumCircle };
