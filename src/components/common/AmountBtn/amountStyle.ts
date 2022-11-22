import styled from "styled-components";

const AmountBtnBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  width: 152px;
  height: 50px;
  border: 1px solid var(--color-grey);
  border-radius: 5px;
`;

const MinusBtn = styled.button`
  height: 100%;
  border-right: 1px solid var(--color-grey);
  border-radius: 5px 0 0 5px;
  &:hover {
    background-color: var(--color-brightGrey);
  }
  &:disabled {
    background-color: var(--color-white);
    cursor: default;
  }
`;

const PlusBtn = styled.button`
  height: 100%;
  border-left: 1px solid var(--color-grey);
  border-radius: 0 5px 5px 0;
  &:hover {
    background-color: var(--color-brightGrey);
  }
  &:disabled {
    background-color: var(--color-white);
    cursor: default;
  }
`;

const AmountText = styled.span`
  text-align: center;
  font-size: 1.8rem;
  line-height: 2.3rem;
`;

export { AmountBtnBox, MinusBtn, PlusBtn, AmountText };
