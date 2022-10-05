import styled, { css } from "styled-components";

const LabelText = styled.label`
  margin-bottom: 10px;
  display: block;
  font-size: 1.6rem;
  line-height: 2rem;
  color: var(--color-darkGrey);
`;

const Input = styled.input<{ width: string; icon?: string }>`
  width: ${({ width }) => width};
  padding: 16px 6px;
  font-size: 1.6rem;
  line-height: 2rem;
  border-radius: 5px;
  border: 1px solid var(--color-grey);
  outline-color: var(--color-main);
  background: url(${({ icon }) => icon}) no-repeat right 15px center;
`;

const InputPhone = styled(Input)`
  &:nth-child(2),
  &:nth-child(3) {
    margin-right: 12px;
  }
`;

const InputEmailBox = styled.div`
  span {
    margin: 0 11px;
    color: var(--color-darkGrey);
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2rem;
  }
`;

export { LabelText, Input, InputPhone, InputEmailBox };
