import React from "react";
import * as S from "./checkLabelStyle";

type CheckLabelProps = {
  children: React.ReactNode;
  color?: string;
};

function CheckLabel({ children, color }: CheckLabelProps) {
  return (
    <S.LabelBox>
      <S.CheckBox type="checkbox" id="check" />
      <S.LabelText htmlFor="check" color={color}>
        {children}
      </S.LabelText>
    </S.LabelBox>
  );
}

export default CheckLabel;
