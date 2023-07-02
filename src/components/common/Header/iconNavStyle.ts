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
  padding-left: ${({ arrow }) => (arrow ? " 1.5rem" : "1rem")};
  width: ${({ arrow }) => (arrow ? "14rem" : "11rem")};
  display: flex;
  align-items: center;
  gap: ${({ arrow }) => (arrow ? "0.5rem" : "0rem")};
  border-radius: 2rem;
  font-size: 1.2rem;
  small {
    width: 7rem;
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
