import React from "react";
import { NormalBtn } from "../Button/Button";
import * as S from "./ArrowModalStyle";

interface ArrowModalProps {
  on: boolean;
  list: {
    label: string;
    onClick: () => void;
  }[];
}

function ArrowModal({ on, list }: ArrowModalProps) {
  return (
    <S.Container on={on.toString()}>
      <S.Arrows type="border" />
      <S.Arrows type="arrow" />
      <S.BtnWrap>
        {list.map((item, index) => {
          return (
            <NormalBtn
              key={index}
              color="white"
              width="110px"
              fontSize="1.6rem"
              padding="8px 0"
              border="false"
              onClick={item.onClick}
            >
              {item.label}
            </NormalBtn>
          );
        })}
      </S.BtnWrap>
    </S.Container>
  );
}

export default ArrowModal;
