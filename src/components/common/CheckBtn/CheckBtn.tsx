import React from "react";
import * as S from "./CheckBtnStyle";

type CheckBtnProps = {
  name: "item" | "allSelect";
  productId?: number;
  onCheckInput: (e: React.ChangeEvent<HTMLInputElement>, productId?: number) => void;
  isChecked: boolean;
};

export function CircleCheckBtn({ name, productId, onCheckInput, isChecked = true }: CheckBtnProps) {
  return (
    <>
      <S.CircleCheckBtn
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={(e) => onCheckInput(e, productId)}
      />
    </>
  );
}
