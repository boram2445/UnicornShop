import styled from "styled-components";

const InputWrap = styled.div<{ width?: string }>`
  margin-top: 10px;
  width: ${({ width }) => (width ? width : "100%")};
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: var(--color-darkGrey);
  font-size: 1.6rem;
  line-height: 2rem;
`;

const TextInputBox = styled.input`
  padding: 16px 70px 16px 15px;
  border: 1px solid var(--color-grey);
  border-radius: 5px;
  font-size: 1.6rem;
  line-height: 2rem;
`;

const TextLength = styled.small`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.6rem;
  line-height: 2rem;
  color: var(--color-grey);
`;

const NumInputBox = styled(TextInputBox)`
  border-radius: 5px 0 0 5px;
  margin-right: 54px;
  padding-right: 5px;
`;

const UnitText = styled.p`
  position: absolute;
  right: 0;
  width: 54px;
  height: 54px;
  border-radius: 0 5px 5px 0;
  background-color: var(--color-grey);
  color: var(--color-white);
  text-align: center;
  font-size: 1.6rem;
  line-height: 54px;
`;

export { InputWrap, Label, TextInputBox, TextLength, NumInputBox, UnitText };
