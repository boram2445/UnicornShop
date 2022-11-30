import React, { useState } from "react";
import { getToken } from "../../../features/loginSlice";
import { fetchPutCartQuantity, CartItem } from "../../../features/cartListSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { ReactComponent as PlusIcon } from "../../../assets/icons/icon-plus-line.svg";
import { ReactComponent as MinusIcon } from "../../../assets/icons/icon-minus-line.svg";
import * as S from "./amountStyle";

interface AmountBtnProps {
  count?: number;
  getCount?: (res: number) => void; //선택 개수를 반환
  product_id?: number;
  cart_item_id?: number;
  item?: CartItem;
  stock: number;
}

function AmountBtn({ count, getCount, item, stock }: AmountBtnProps) {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(count || 1);
  const [onIncreaseBtn, setOnIncreaseBtn] = useState(true);
  const TOKEN = useAppSelector(getToken) || "";

  const onIncrease = () => {
    if (!onIncreaseBtn) return;
    const quantity = amount + 1;
    if (quantity >= stock) {
      setOnIncreaseBtn(!onIncreaseBtn);
    }
    setAmount(quantity);
    getCount?.(quantity);
    //장바구니 수량 변경 처리
    if (item) {
      const { product_id, cart_item_id, is_active } = item;
      dispatch(fetchPutCartQuantity({ TOKEN, product_id, quantity, cart_item_id, is_active }));
    }
  };

  const onDecrease = () => {
    const quantity = amount - 1 < 1 ? 1 : amount - 1;
    if (!onIncreaseBtn && quantity <= stock) {
      setOnIncreaseBtn(true);
    }
    setAmount(quantity);
    getCount?.(quantity);
    if (item) {
      const { product_id, cart_item_id, is_active } = item;
      dispatch(fetchPutCartQuantity({ TOKEN, product_id, quantity, cart_item_id, is_active }));
    }
  };
  return (
    <S.AmountBtnBox>
      <S.MinusBtn onClick={onDecrease} disabled={amount <= 1}>
        <MinusIcon stroke={amount > 1 ? "#767676" : "#F2F2F2"} />
      </S.MinusBtn>
      <S.AmountText>{amount}</S.AmountText>
      <S.PlusBtn onClick={onIncrease} disabled={!onIncreaseBtn}>
        <PlusIcon stroke={onIncreaseBtn ? "#767676" : "#F2F2F2"} />
      </S.PlusBtn>
    </S.AmountBtnBox>
  );
}

export default AmountBtn;
