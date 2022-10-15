import React from "react";
import * as S from "../DeliveryInfo/deliveryInfoStyle";

type InputProps = {
  name: string;
  type: string;
  label: string;
  pattern: string;
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormInput({ value, onChange, ...restProps }: InputProps) {
  return (
    <S.Row>
      <S.LabelText></S.LabelText>
      <td>
        <S.Input {...restProps} onChange={onChange} />
      </td>
    </S.Row>
  );
}

export default FormInput;
