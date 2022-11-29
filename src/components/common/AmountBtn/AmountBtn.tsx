import React, { useState } from "react";
import plusIcon from "../../../assets/icons/icon-plus-line.svg";
import minusIcon from "../../../assets/icons/icon-minus-line.svg";
import plusDisableIcon from "../../../assets/icons/icon-plus-line-disabled.svg";
import minusDisableIcon from "../../../assets/icons/icon-minus-line-disabled.svg";
import * as S from "./amountStyle";
import { fetchPutCartQuantity, CartItem } from "../../../features/cartListSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getToken } from "../../../features/loginSlice";

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
        <img src={amount > 1 ? minusIcon : minusDisableIcon} />
      </S.MinusBtn>
      <S.AmountText>{amount}</S.AmountText>
      <S.PlusBtn onClick={onIncrease} disabled={!onIncreaseBtn}>
        <img src={onIncreaseBtn ? plusIcon : plusDisableIcon} />
      </S.PlusBtn>
    </S.AmountBtnBox>
  );
}

export default AmountBtn;
