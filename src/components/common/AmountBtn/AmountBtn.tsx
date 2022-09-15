import React, { useState } from "react";
import plusIcon from "../../../assets/icons/icon-plus-line.svg";
import minusIcon from "../../../assets/icons/icon-minus-line.svg";
import plusDisableIcon from "../../../assets/icons/icon-plus-line-disabled.svg";
import * as S from "./amountStyle";
function AmountBtn() {
  const [amount, setAmount] = useState<number>(1);
  const onIncrease = () => setAmount(amount + 1);
  const onDecrease = () => {
    const res = amount - 1;
    setAmount(res < 1 ? 1 : res);
  };
  return (
    <S.AmountBtnBox>
      <S.MinusBtn onClick={onDecrease}>
        <img src={minusIcon} />
      </S.MinusBtn>
      <S.AmountText>{amount}</S.AmountText>
      <S.PlusBtn onClick={onIncrease}>
        <img src={plusIcon} />
      </S.PlusBtn>
    </S.AmountBtnBox>
  );
}

export default AmountBtn;
