import styled, { css } from "styled-components";

interface NormalBtnProps {
  size?: string;
  color?: string;
  icon?: string;
  tab?: boolean;
}

const NormalBtn = styled.button<NormalBtnProps>`
  width: 480px;
  padding: 19px 0;
  font-size: 1.8rem;
  line-height: 2.2rem;
  border-radius: 5px;
  background-color: var(--color-main);
  color: var(--color-white);
  &:disabled {
    background-color: var(--color-grey);
    cursor: default;
  }
  ${({ size, icon }) => {
    if (size === "ssmall") {
      return css`
        width: 80px;
        padding: 10px 0;
      `;
    }
    if (size === "small") {
      return css`
        width: 130px;
        padding: 10px 0;
      `;
    }
    if (icon && size === "smedium") {
      return css`
        display: flex;
        align-items: center;
        gap: 8px;
        width: 166px;
        padding: 11px 20px;
      `;
    }
    if (size === "smedium") {
      return css`
        width: 166px;
        padding: 17px 0;
      `;
    }
    if (size === "medium") {
      return css`
        width: 480px;
        padding: 19px 0;
      `;
    }
    if (size === "large") {
      return css`
        width: 220px;
        padding: 19px 0;
        font-size: 2.4rem;
        line-height: 3rem;
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
  ${({ tab }) => {
    if (tab) {
      return css`
        width: 320px;
        padding: 19px 0 12px;
        background-color: var(--color-white);
        color: var(--color-main);
        border-bottom: var(--color-main) 6px solid;
        border-radius: 0;
        &:disabled {
          color: var(--color-darkGrey);
          border-bottom: var(--color-grey) 6px solid;
          background-color: var(--color-white);
          cursor: pointer;
        }
      `;
    }
  }}
`;

const TabMenuBtn = styled.button<{ on?: boolean }>`
  width: 250px;
  padding: 15px 0;
  color: var(--color-black);
  font-size: 1.6rem;
  line-height: 2rem;
  background-color: var(--color-white);
  border-radius: 5px;
  span {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 77px;
    color: var(--color-white);
    background-color: var(--color-red);
    border-radius: 50%;
  }
  ${({ on }) => {
    if (on) {
      return css`
        background-color: var(--color-main);
      `;
    } else {
      return css`
        &:hover {
          background-color: var(--color-brigthPink);
        }
      `;
    }
  }}
`;

export { NormalBtn, TabMenuBtn };
