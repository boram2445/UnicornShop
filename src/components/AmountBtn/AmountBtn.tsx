import React, { useState } from "react";
import plusIcon from "../../assets/icon-plus-line.svg";
import minusIcon from "../../assets/icon-minus-line.svg";
import plusDisableIcom from "../../assets/icon-plus-line-disabled.svg";
import { AmountBtnBox, MinusBtn, PlusBtn, AmountText } from "./amountStyle";
function AmountBtn() {
  const [amount, setAmount] = useState<number>(1);
  const onIncrease = () => setAmount(amount + 1);
  const onDecrease = () => {
    const res = amount - 1;
    setAmount(res < 1 ? 1 : res);
  };
  return (
    <AmountBtnBox>
      <MinusBtn onClick={onDecrease}>
        <img src={minusIcon} />
      </MinusBtn>
      <AmountText>{amount}</AmountText>
      <PlusBtn onClick={onIncrease}>
        <img src={plusIcon} />
      </PlusBtn>
    </AmountBtnBox>
  );
}

export default AmountBtn;
