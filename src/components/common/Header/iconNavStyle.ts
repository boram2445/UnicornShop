import styled, { css } from "styled-components";
import ArrowDownIcon from "../../../assets/icons/icon-Triangle-down.svg";
import ArrowUpIcon from "../../../assets/icons/icon-Triangle-up.svg";

const UerModalWrap = styled.div`
  position: relative;
`;

const NavBtn = styled.button`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
  &:hover {
    background-color: var(--color-brightGrey);
  }
`;

const WideNavBtn = styled(NavBtn)<{ arrow?: string }>`
  padding: ${({ arrow }) => (arrow ? "0 1.5rem" : "0 0 0 1rem")};
  width: ${({ arrow }) => (arrow ? "14.5rem" : "11rem")};
  justify-content: start;
  gap: ${({ arrow }) => (arrow ? "0.5rem" : "0rem")};
  border-radius: 2rem;
  font-size: 1.3rem;
  small {
    width: 7.5rem;
  }
  ${({ arrow }) => {
    if (arrow === "open") {
      return css`
        background: url(${ArrowDownIcon}) no-repeat right 10px center;
        background-color: var(--color-brightGrey);
      `;
    } else if (arrow === "close") {
      return css`
        background: url(${ArrowUpIcon}) no-repeat right 10px center;
      `;
    } else {
      return css`
        justify-content: center;
      `;
    }
  }}
`;

export { UerModalWrap, NavBtn, WideNavBtn };
