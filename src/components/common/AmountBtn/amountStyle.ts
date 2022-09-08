import styled from "styled-components";

const AmountBtnBox = styled.div`
  display: grid;
  grid-template-columns: 50px 50px 50px;
  align-items: center;
  width: 150px;
  height: 50px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
`;

const MinusBtn = styled.button`
  height: 100%;
  border-right: 1px solid #c4c4c4;
`;

const PlusBtn = styled.button`
  height: 100%;
  border-left: 1px solid #c4c4c4;
`;

const AmountText = styled.span`
  text-align: center;
  font-size: 1.8rem;
  line-height: 2.3rem;
`;

export { AmountBtnBox, MinusBtn, PlusBtn, AmountText };
