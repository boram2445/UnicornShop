import React, { useState } from "react";
import { handleCheckedItem } from "../../../reducers/cartListSlice";
import * as S from "./CheckBtnStyle";
import { useAppDispatch } from "../../../hooks";

type CheckBtnProps = {
  price?: number;
  count: number;
  productId: number;
};

export function CircleCheckBtn({ price, count, productId }: CheckBtnProps) {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    const isChecked = e.target.checked;
    dispatch(handleCheckedItem({ productId, isChecked, price, count }));
  };
  return (
    <>
      <S.CircleCheckBtn type="checkbox" name="product" onChange={checkHandler} />
    </>
  );
}
