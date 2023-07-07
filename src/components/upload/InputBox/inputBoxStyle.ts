import styled from "styled-components";

const InputWrap = styled.div<{ width?: string }>`
  margin-top: 1rem;
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
  padding: 1.2rem 7rem 1.2rem 1.5rem;
  border: 1px solid var(--color-grey);
  border-radius: 0.5rem;
  font-size: 1.6rem;
  line-height: 2rem;
`;

const TextLength = styled.small`
  position: absolute;
  right: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.6rem;
  line-height: 2rem;
  color: var(--color-grey);
`;

const NumInputBox = styled(TextInputBox)`
  border-radius: 0.5rem 0 0 0.5rem;
  margin-right: 5.4rem;
  padding-right: 0.5rem;
`;

const UnitText = styled.p`
  position: absolute;
  right: 0;
  width: 5.4rem;
  border-radius: 0 0.5rem 0.5rem 0;
  background-color: var(--color-grey);
  color: var(--color-white);
  text-align: center;
  font-size: 1.6rem;
  line-height: 4.6rem;
`;

export { InputWrap, Label, TextInputBox, TextLength, NumInputBox, UnitText };
