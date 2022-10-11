import React, { useState } from "react";
import ArrowDownIcon from "../../../assets/icons/icon-down-arrow.svg";
import ArrowUpIcon from "../../../assets/icons/icon-up-arrow.svg";
import * as S from "./selectInputStyle";

type SelectInputProps = {
  selectItems: string[];
};

function SelectInput({ selectItems }: SelectInputProps) {
  const [onToggle, setOnToggle] = useState(false);
  const [selected, setSelected] = useState(selectItems[0]);

  const handleItemClick = (item: string) => {
    setSelected(item);
    setOnToggle(!onToggle);
  };

  return (
    <S.SelectArticle>
      <S.SelectedBtn
        type="button"
        icon={onToggle ? ArrowDownIcon : ArrowUpIcon}
        onClick={() => setOnToggle(!onToggle)}
      >
        {selected}
      </S.SelectedBtn>
      <S.SelectList on={onToggle.toString()}>
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
