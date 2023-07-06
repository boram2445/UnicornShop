import React from "react";
import * as S from "./buttonStyle";

interface NormalBtnProps {
  children: React.ReactNode;
  type?: "button" | "submit"; //literal type
  disabled?: boolean;
  fontSize?: string;
  fontWeight?: string;
  width?: string;
  padding?: string;
  color?: string;
  border?: string; //border를 없애고 싶은 경우 'false'
  icon?: string;
  on?: string; //선택후 고정이어야 할 경우 'true'
  tab?: string; //탭 버튼일 경우 'true'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface TabMenuBtnProps {
  children: React.ReactNode;
  fixed?: boolean;
  num?: number;
  onClick?: () => void;
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
export function TabMenuBtn({ children, fixed, num, onClick }: TabMenuBtnProps) {
  return (
    <S.TabMenuBtn fixed={fixed?.toString()} onClick={onClick}>
      {children}
      {num && <S.NumCircle>{num}</S.NumCircle>}
    </S.TabMenuBtn>
  );
}
