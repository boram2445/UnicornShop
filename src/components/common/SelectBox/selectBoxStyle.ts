import styled from "styled-components";
import ArrowDownIcon from "../../../assets/icons/icon-down-arrow.svg";
import ArrowUpIcon from "../../../assets/icons/icon-up-arrow.svg";

const SelectArticle = styled.article<{ width: string; maxWidth?: string; minWidth?: string }>`
  width: ${({ width }) => width};
  display: inline-block;
  cursor: pointer;
`;

const SelectBox = styled.div<{
  textAlign?: string;
  isOpen: string;
  maxWidth?: string;
  minWidth?: string;
  radius?: string;
  padding: string;
}>`
  width: 100%;
  display: flex;
  justify-content: ${({ textAlign }) => textAlign};
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};
  padding: ${({ padding }) => padding};
  font-size: 1.6rem;
  line-height: 2rem;

  background: ${({ isOpen }) =>
    isOpen === "true"
      ? `url(${ArrowDownIcon}) no-repeat right 5px center`
      : `url(${ArrowUpIcon}) no-repeat right 5px center`};
  border: 1px solid var(--color-grey);
  border-radius: ${({ radius }) => radius};
  &:focus {
    border-color: transparent;
    outline: var(--color-main) 2px solid;
  }
`;

const SelectList = styled.ul<{
  on: string;
  width: string;
  maxWidth?: string;
  minWidth?: string;
  radius?: string;
  textAlign?: string;
}>`
  margin-top: 6px;
  position: absolute;
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};
  max-height: 152px;
  overflow-y: scroll;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--color-grey);
  border-radius: ${({ radius }) => radius};
  background-color: var(--color-white);
  z-index: 100;
  li button {
    font-size: 1.6rem;
    line-height: 2rem;
    cursor: pointer;
    width: 100%;
    height: 40px;
    text-align: ${({ textAlign }) => textAlign};
    padding: 0 10px;
    &:hover {
      background-color: var(--color-brightGrey);
    }
  }
  display: ${({ on }) => (on === "true" ? "block" : "none")};
`;

export { SelectArticle, SelectBox, SelectList };
