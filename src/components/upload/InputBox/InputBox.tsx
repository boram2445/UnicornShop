import React, { useState } from "react";
import * as S from "./inputBoxStyle";
import { limitInputLength } from "../../../utils/checkInputValid";

function TextInput() {
  const label = "상품명";
  const [inputText, setInputText] = useState("");

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = limitInputLength(e.target.value, 50);
    setInputText(value);
  };

  return (
    <div>
      <S.Label htmlFor={label}>{label}</S.Label>
      <S.InputWrap>
        <S.TextInputBox id={label} onChange={handleTextInput} value={inputText} />
        <S.TextLength>{inputText.length}/50</S.TextLength>
      </S.InputWrap>
    </div>
  );
}

function NumInput() {
  const label = "판매가";
  const unit = "원";
  const [priceText, setPriceText] = useState("");
  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = limitInputLength(e.target.value, 10).replace(/[^0-9]/g, "");
    setPriceText(value);
  };
  return (
    <div>
      <S.Label htmlFor={label}>{label}</S.Label>
      <S.InputWrap width="220px">
        <S.NumInputBox
          id={label}
          onChange={handlePriceInput}
          value={Number(priceText).toLocaleString()}
        />
        <S.UnitText>{unit}</S.UnitText>
      </S.InputWrap>
    </div>
  );
}

export { TextInput, NumInput };
