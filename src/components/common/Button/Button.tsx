import React from "react";
import * as S from "./buttonStyle";

interface NormalBtnProps {
  children: React.ReactNode;
  type?: "button" | "submit"; //literal type
  size?: string;
  width?: string;
  color?: string;
  disabled?: boolean;
  icon?: string;
  tab?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface TabMenuBtnProps {
  children: React.ReactNode;
  fixed?: boolean;
  num?: number;
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
export function TabMenuBtn({ children, fixed, num }: TabMenuBtnProps) {
  return (
    <S.TabMenuBtn fixed={fixed?.toString()}>
      {children}
      {fixed && <span>({num})</span>}
      {!fixed && num && <S.NumCircle>{num}</S.NumCircle>}
    </S.TabMenuBtn>
  );
}
