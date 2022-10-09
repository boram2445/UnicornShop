import styled from "styled-components";

const SelectArticle = styled.article`
  width: 150px;
`;

const SelectedBtn = styled.button<{ on: boolean; icon: string }>`
  display: grid;
  grid-template-columns: 1fr 20px;
  width: 100%;
  padding: 16px 6px;
  border: 1px solid var(--color-grey);
  border-radius: 5px;
  font-size: 1.6rem;
  line-height: 2rem;
  outline-color: var(--color-main);
  background: url(${({ icon }) => icon}) no-repeat right 13px center;
  &:focus {
    border-color: transparent;
    outline: var(--color-main) 2px solid;
  }
`;

const SelectList = styled.ul<{ on: boolean }>`
  margin-top: 6px;
  position: absolute;
  border: 1px solid var(--color-grey);
  border-radius: 5px;
  width: 150px;
  height: 152px;
  background-color: var(--color-white);
  overflow-y: scroll;
  box-shadow: 4px 4px 14px 0px #00000026;
  li button {
    font-size: 1.6rem;
    line-height: 2rem;
    cursor: pointer;
    width: 100%;
    height: 40px;
    &:hover {
      background-color: var(--color-brightGrey);
    }
  }
  display: ${({ on }) => (on ? "block" : "none")};
`;

export { SelectArticle, SelectedBtn, SelectList };
