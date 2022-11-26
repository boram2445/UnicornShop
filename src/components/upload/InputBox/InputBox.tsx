import React, { useState } from "react";
import * as S from "./inputBoxStyle";
import { limitInputLength } from "../../../utils/checkInputValid";

interface TextInputProps {
  label: string;
  name: string;
  handleOnChange: (name: string, value: string | number) => void;
  value?: string;
}

function TextInput({ label, name, value, handleOnChange }: TextInputProps) {
  const [inputText, setInputText] = useState(value);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = limitInputLength(e.target.value, 20);
    handleOnChange(name, value);
    setInputText(value);
  };

  return (
    <div>
      <S.Label htmlFor={label}>{label}</S.Label>
      <S.InputWrap>
        <S.TextInputBox id={label} name={name} onChange={handleTextInput} value={inputText} />
        <S.TextLength>{inputText?.length}/20</S.TextLength>
      </S.InputWrap>
    </div>
  );
}

interface NumInputProps {
  label: string;
  name: string;
  unit: string;
  value?: number;
  handleOnChange: (name: string, value: string | number) => void;
}

function NumInput({ label, name, unit, value, handleOnChange }: NumInputProps) {
  const [priceText, setPriceText] = useState(value);
  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = limitInputLength(e.target.value, 10).replace(/[^0-9]/g, "");
    handleOnChange(name, Number(value));
    setPriceText(Number(value));
  };
  return (
    <div>
      <S.Label htmlFor={label}>{label}</S.Label>
      <S.InputWrap width="220px">
        <S.NumInputBox
          id={label}
          name={name}
          onChange={handlePriceInput}
          value={priceText?.toLocaleString()}
        />
        <S.UnitText>{unit}</S.UnitText>
      </S.InputWrap>
    </div>
  );
}

export { TextInput, NumInput };
