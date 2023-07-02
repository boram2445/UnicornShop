import styled from "styled-components";

const AmountBtnBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  width: 15.2rem;
  height: 5rem;
  border: 1px solid var(--color-grey);
  border-radius: 0.5rem;
`;

const MinusBtn = styled.button`
  height: 100%;
  border-right: 1px solid var(--color-grey);
  border-radius: 0.5rem 0 0 0.5rem;
  &:hover {
    background-color: var(--color-brightGrey);
  }
  &:disabled {
    background-color: var(--color-white);
    cursor: default;
  }
`;

const PlusBtn = styled(MinusBtn)`
  border-right: transparent;
  border-left: 1px solid var(--color-grey);
  border-radius: 0 0.5rem 0.5rem 0;
`;

const AmountText = styled.span`
  text-align: center;
  font-size: 1.8rem;
  line-height: 2.3rem;
`;

export { AmountBtnBox, MinusBtn, PlusBtn, AmountText };
