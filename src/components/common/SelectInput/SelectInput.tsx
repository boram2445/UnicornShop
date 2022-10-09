import React, { useState } from "react";
import ArrowDownIcon from "../../../assets/icons/icon-down-arrow.svg";
import ArrowUpIcon from "../../../assets/icons/icon-up-arrow.svg";
import * as S from "./selectInputStyle";

function DropDown() {
  const [onToggle, setOnToggle] = useState(false);
  const [selected, setSelected] = useState("010");

  const handleItemClick = (item: string) => {
    setSelected(item);
    setOnToggle(!onToggle);
  };
  return (
    <S.SelectArticle>
      <S.SelectedBtn
        type="button"
        on={onToggle}
        icon={onToggle ? ArrowDownIcon : ArrowUpIcon}
        onClick={() => setOnToggle(!onToggle)}
      >
        {selected}
      </S.SelectedBtn>
      <S.SelectList on={onToggle}>
        <li>
          <button type="button" onClick={() => handleItemClick("010")}>
            010
          </button>
        </li>
        <li>
          <button type="button" onClick={() => handleItemClick("011")}>
            011
          </button>
        </li>
        <li>
          <button type="button" onClick={() => handleItemClick("016")}>
            016
          </button>
        </li>
        <li>
          <button type="button" onClick={() => handleItemClick("017")}>
            017
          </button>
        </li>
        <li>
          <button type="button" onClick={() => handleItemClick("018")}>
            018
          </button>
        </li>
        <li>
          <button type="button" onClick={() => handleItemClick("019")}>
            019
          </button>
        </li>
      </S.SelectList>
    </S.SelectArticle>
  );
}

export default DropDown;
