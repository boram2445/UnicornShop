import React from "react";
import { useAppSelector } from "../../../hooks";
import { selectCheckAllState } from "../../../features/cartListSlice";
import { CircleCheckBtn } from "../../common/CheckBtn/CheckBtn";
import * as S from "./cartInfoStyle";

interface CartInfoProps {
  onCheckInput: (e: React.ChangeEvent<HTMLInputElement>, productId?: number) => void;
}

function CartInfo({ onCheckInput }: CartInfoProps) {
  const isAllChecked = useAppSelector(selectCheckAllState);

  return (
    <S.CartInfoBox>
      <CircleCheckBtn name="allSelect" onCheckInput={onCheckInput} isChecked={isAllChecked} />
      <strong>상품정보</strong>
      <div>
        <strong>수량</strong>
        <strong>상품금액</strong>
      </div>
    </S.CartInfoBox>
  );
}

export default CartInfo;
