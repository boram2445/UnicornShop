import styled from "styled-components";

const InputBox = styled.div`
  button {
    margin-left: 1rem;
  }
`;

const LabelText = styled.label`
  margin-bottom: 1rem;
  display: block;
  font-size: 1.6rem;
  line-height: 2rem;
  color: var(--color-darkGrey);
`;

const Input = styled.input<{ width?: string; icon?: string }>`
  width: ${({ width }) => (width ? width : "100%")};
  padding: 1.6rem;
  font-size: 1.6rem;
  line-height: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-grey);
  outline-color: var(--color-main);
  background: ${({ icon }) => icon && `url(${icon}) no-repeat right 15px center`};
`;

const ErrorText = styled.small<{ error?: string }>`
  display: block;
  margin: 0.6rem 0 0 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-red);
`;

const InputPhoneBox = styled.div`
  div {
    display: flex;
    gap: 1.2rem;
  }
`;

const InputPhone = styled(Input)``;

const InputEmailBox = styled.div`
  span {
    margin: 0 1.1rem;
    color: var(--color-darkGrey);
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2rem;
  }
`;

export { InputBox, LabelText, ErrorText, Input, InputPhoneBox, InputPhone, InputEmailBox };
