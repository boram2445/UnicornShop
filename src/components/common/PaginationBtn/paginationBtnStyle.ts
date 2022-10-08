import styled, { css } from "styled-components";

const pageList = styled.ul`
  margin: 80px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const pageItem = styled.li<{ on?: string }>`
  margin: 0.4rem 0.5rem;
  width: 30px;
  line-height: 3rem;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: var(--color-main);
  }
  ${({ on }) => {
    if (on === "true") {
      return css`
        background-color: var(--color-main);
        color: var(--color-white);
        border-radius: 5px;
        :hover {
          color: var(--color-white);
        }
      `;
    }
  }}
`;

const ArrowItem = styled.li<{ icon: string }>`
  margin: auto 0.8rem;
  width: 30px;
  height: 30px;
  background: url(${({ icon }) => icon}) no-repeat center;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

export { pageList, pageItem, ArrowItem };
