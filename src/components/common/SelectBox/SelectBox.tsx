import React, { useState, useEffect, useRef } from "react";
import * as S from "./selectBoxStyle";

interface SelectBoxProps {
  selectItems: string[];
  onClick: (selected: string) => void;
  checkItem?: string;
  width: string;
  minWidth?: string;
  maxWidth?: string;
  radius?: string;
  padding: string;
  textAlign?: string;
}

function SelectBox({
  selectItems,
  onClick,
  checkItem,
  width,
  maxWidth,
  minWidth,
  radius,
  padding,
  textAlign,
}: SelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectBoxRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (!selectBoxRef.current?.contains(target as Node)) setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (item: string) => {
    setIsOpen(!isOpen);
    onClick(item);
  };

  return (
    <S.SelectArticle
      width={width}
      maxWidth={maxWidth}
      minWidth={minWidth}
      onClick={() => setIsOpen((prev) => !prev)}
      ref={selectBoxRef}
    >
      <S.SelectBox
        isOpen={isOpen.toString()}
        maxWidth={maxWidth}
        minWidth={minWidth}
        radius={radius}
        padding={padding}
        textAlign={textAlign}
      >
        {checkItem ? checkItem : selectItems[0]}
      </S.SelectBox>
      <S.SelectList
        on={isOpen.toString()}
        width={width}
        maxWidth={maxWidth}
        minWidth={minWidth}
        radius={radius}
        textAlign={textAlign}
      >
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

export default SelectBox;
