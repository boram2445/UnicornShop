import React, { useState } from "react";
import { fetchPutCartQuantity } from "../../../reducer/cartListSlice";
import { useAppDispatch } from "../../../hooks";
import { ReactComponent as PlusIcon } from "../../../assets/icons/icon-plus-line.svg";
import { ReactComponent as MinusIcon } from "../../../assets/icons/icon-minus-line.svg";
import { CartProduct } from "../../../types/cart";
import * as S from "./amountStyle";

type AmountBtnProps = {
  selectAmount?: number;
  stock: number;
  product_id?: number;
  cart_item_id?: number;
  item?: CartProduct;
  getCount?: (res: number) => void;
};

function AmountBtn({ selectAmount = 0, getCount, item, stock }: AmountBtnProps) {
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState(selectAmount || 1);
  const [onIncreaseBtn, setOnIncreaseBtn] = useState(stock > 0 && selectAmount <= stock);

  const onIncrease = () => {
    if (!onIncreaseBtn) return;
    const plusAmount = amount + 1;
    if (plusAmount >= stock) setOnIncreaseBtn(false);
    handleChangeAmount(plusAmount);
  };

  const onDecrease = () => {
    const minusAmount = amount - 1 < 1 ? 1 : amount - 1;
    if (!onIncreaseBtn && minusAmount <= stock) setOnIncreaseBtn(true);
    handleChangeAmount(minusAmount);
  };

  const handleChangeAmount = (amount: number) => {
    setAmount(amount);
    getCount?.(amount);
    handleCartQuantity(amount);
  };

  const handleCartQuantity = (quantity: number) => {
    if (item) {
      const { product_id, cart_item_id, is_active } = item;
      dispatch(fetchPutCartQuantity({ product_id, quantity, cart_item_id, is_active }));
    }
  };

  return (
    <S.AmountBtnBox>
      <S.MinusBtn onClick={onDecrease} disabled={amount <= 1}>
        <MinusIcon stroke={amount > 1 ? "#767676" : "#F2F2F2"} />
      </S.MinusBtn>
      <S.AmountText>{!stock ? 0 : amount}</S.AmountText>
      <S.PlusBtn onClick={onIncrease} disabled={!onIncreaseBtn}>
        <PlusIcon stroke={onIncreaseBtn ? "#767676" : "#F2F2F2"} />
      </S.PlusBtn>
    </S.AmountBtnBox>
  );
}

export default AmountBtn;
