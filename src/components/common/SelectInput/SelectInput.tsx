import React, { useState } from "react";
import ArrowDownIcon from "../../../assets/icons/icon-down-arrow.svg";
import ArrowUpIcon from "../../../assets/icons/icon-up-arrow.svg";
import * as S from "./selectInputStyle";

type SelectInputProps = {
  selectItems: string[];
  onClick: (selected: string) => void;
  checkItem?: string;
  width: string;
  radius?: string;
  padding: string;
  textAlign?: string;
};

function SelectInput({
  selectItems,
  onClick,
  checkItem,
  width,
  radius,
  padding,
  textAlign,
}: SelectInputProps) {
  const [onToggle, setOnToggle] = useState(false);

  const handleItemClick = (item: string) => {
    setOnToggle(!onToggle);
    onClick(item);
  };

  return (
    <S.SelectArticle width={width}>
      <S.InputWrap width={width} radius={radius} padding={padding}>
        <S.SelectInput value={checkItem ? checkItem : selectItems[0]} textAlign={textAlign} />
        <S.InputBtn onClick={() => setOnToggle(!onToggle)} width={width}>
          <img src={onToggle ? ArrowDownIcon : ArrowUpIcon} alt="검색" />
        </S.InputBtn>
      </S.InputWrap>
      <S.SelectList on={onToggle.toString()} width={width} radius={radius} textAlign={textAlign}>
        {selectItems.map((item, index) => (
          <li key={index}>
            <button type="button" onClick={() => handleItemClick(item)}>
              {item}
            </button>
          </li>
        ))}
      </S.SelectList>
    </S.SelectArticle>
  );
}

export default SelectInput;
