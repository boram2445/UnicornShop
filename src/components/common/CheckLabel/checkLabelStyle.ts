import styled from "styled-components";

const LabelBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CheckInput = styled.input`
  height: 16px;
  width: 16px;
  border-radius: 3px;
  cursor: pointer;
  accent-color: var(--color-main);
`;

const LabelText = styled.label<{ color?: string }>`
  margin-left: 10px;
  font-size: 1.6rem;
  line-height: 2rem;
  color: ${({ color }) => color || "black"};
  cursor: pointer;
  u {
    font-weight: 700;
  }
`;

export { LabelBox, CheckInput, LabelText };
