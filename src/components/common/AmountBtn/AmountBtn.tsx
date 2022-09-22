import React, { useEffect, useState } from "react";
import plusIcon from "../../../assets/icons/icon-plus-line.svg";
import minusIcon from "../../../assets/icons/icon-minus-line.svg";
import plusDisableIcon from "../../../assets/icons/icon-plus-line-disabled.svg";
import * as S from "./amountStyle";

interface AmountBtnProps {
  count?: number;
  getCount: (res: number) => void; //선택 개수를 반환하는 함수
}

function AmountBtn({ count, getCount }: AmountBtnProps) {
  const [amount, setAmount] = useState<number>(1);
  useEffect(() => {
    count && setAmount(count);
  }, []);
  const onIncrease = () => {
    const res = amount + 1;
    setAmount(res);
    getCount(res);
  };
  const onDecrease = () => {
    const res = amount - 1 < 1 ? 1 : amount - 1;
    setAmount(res);
    getCount(res);
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
