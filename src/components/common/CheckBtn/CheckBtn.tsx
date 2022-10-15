import React, { useEffect } from "react";
import { useAppDispatch } from "../../../hooks";
import { checkItem } from "../../../features/cartListSlice";
import * as S from "./CheckBtnStyle";

type CheckBtnProps = {
  name: "item" | "allSelect";
  productId?: number;
  checkHandler: (e: React.ChangeEvent<HTMLInputElement>, productId?: number) => void;
  isChecked: boolean;
};

export function CircleCheckBtn({ name, productId, checkHandler, isChecked = true }: CheckBtnProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (name !== "allSelect") {
      dispatch(checkItem({ productId, isChecked: true }));
    }
  }, []);
  return (
    <>
      <S.CircleCheckBtn
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={(e) => checkHandler(e, productId)}
      />
    </>
  );
}
