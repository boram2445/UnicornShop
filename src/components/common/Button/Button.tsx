import React from "react";
import * as S from "./buttonStyle";

interface NormalBtnProps {
  children: React.ReactNode;
  type?: "button" | "submit"; //literal type
  size?: string;
  color?: string;
  disabled?: boolean;
  icon?: string;
  tab?: boolean;
  onClick?: () => void;
}

interface TabMenuBtnProps {
  children: React.ReactNode;
  on?: boolean;
}

//기본 버튼
export function NormalBtn({ children, ...props }: NormalBtnProps) {
  return (
    <S.NormalBtn {...props}>
      {props.icon && <img src={props.icon} />}
      {children}
    </S.NormalBtn>
  );
}

//탭 메뉴 버튼
export function TabMenuBtn({ children, ...props }: TabMenuBtnProps) {
  return (
    <S.TabMenuBtn {...props}>
      {children}
      <span>1</span>
    </S.TabMenuBtn>
  );
}