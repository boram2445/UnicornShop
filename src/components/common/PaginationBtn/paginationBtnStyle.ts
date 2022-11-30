import styled, { css } from "styled-components";

const pageList = styled.ul`
  margin: 80px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const pageItem = styled.li<{ on?: string }>`
  margin: 0.4rem 0.5rem;
  width: 40px;
  height: 40px;
  line-height: 4rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  border-radius: 50%;
  cursor: pointer;
  ${({ on }) => {
    if (on === "true") {
      return css`
        background-color: rgba(0, 0, 0, 0.2);
        color: var(--color-white);
      `;
    } else {
      return css`
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      `;
    }
  }}
`;

const ArrowBtn = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  &:disabled {
    cursor: default;
  }
`;

export { pageList, pageItem, ArrowBtn };
