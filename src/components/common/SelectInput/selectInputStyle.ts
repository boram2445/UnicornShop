import styled from "styled-components";

const SelectArticle = styled.article<{ width: string }>`
  width: ${({ width }) => width};
  display: inline-block;
`;

const InputWrap = styled.div<{
  width: string;
  radius?: string;
  textAlign?: string;
  padding: string;
}>`
  position: relative;
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  display: grid;
  grid-template-columns: 1fr 22px;
  border: 1px solid var(--color-grey);
  border-radius: ${({ radius }) => radius};
  outline-color: var(--color-main);
  &:focus {
    border-color: transparent;
    outline: var(--color-main) 2px solid;
  }
`;

const SelectInput = styled.input<{ textAlign?: string }>`
  width: 100%;
  font-size: 1.6rem;
  line-height: 2rem;
  text-align: ${({ textAlign }) => (textAlign ? "start" : "center")};
  border: none;
  outline: none;
`;

const InputBtn = styled.div<{ width: string }>`
  position: absolute;
  cursor: pointer;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

const SelectList = styled.ul<{ on: string; width: string; radius?: string; textAlign?: string }>`
  margin-top: 6px;
  position: absolute;
  width: ${({ width }) => width};
  max-height: 152px;
  overflow-y: scroll;
  box-shadow: 4px 4px 14px 0px #00000026;
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
    text-align: ${({ textAlign }) => (textAlign ? "start" : "center")};
    padding: 0 10px;
    &:hover {
      background-color: var(--color-brightGrey);
    }
  }
  display: ${({ on }) => (on === "true" ? "block" : "none")};
`;

export { SelectArticle, InputWrap, SelectInput, InputBtn, SelectList };
