import styled, { css } from "styled-components";

const SortNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem 1rem 1.5rem;
  border: 1px solid var(--color-brightGrey);
  border-radius: 10px;
`;

const SortTypeList = styled.ul`
  display: flex;
  gap: 2rem;
`;

const SortType = styled.li<{ type?: string }>`
  font-size: 1.3rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  ${({ type }) => {
    if (type === "true") {
      return css`
        color: var(--color-main);
        font-weight: 500;
      `;
    }
  }}
`;

const PostTypeBtn = styled.button`
  margin: 0 0.7rem;
  cursor: pointer;
`;

export { SortNavbar, SortTypeList, SortType, PostTypeBtn };
