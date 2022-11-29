import React from "react";
import * as S from "./checkLabelStyle";

type CheckLabelProps = {
  children: React.ReactNode;
  color?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CheckLabel({ children, color, onChange }: CheckLabelProps) {
  return (
    <S.LabelBox>
      <S.CheckInput type="checkbox" id="check" onChange={onChange} required />
      <S.LabelText htmlFor="check" color={color}>
        {children}
      </S.LabelText>
    </S.LabelBox>
  );
}

export default CheckLabel;
