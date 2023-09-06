import React from "react";
import * as S from "./buttonStyle";

type NormalBtnProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  fontSize?: string;
  fontWeight?: string;
  width?: string;
  padding?: string;
  color?: string;
  border?: "true" | "false";
  icon?: string;
  on?: "true" | "false"; //선택후 고정이어야 할 경우 'true'
  tab?: "true" | "false";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type TabMenuBtnProps = {
  children: React.ReactNode;
  fixed?: boolean;
  num?: number;
  onClick?: () => void;
};

export function NormalBtn({ children, ...props }: NormalBtnProps) {
  return (
    <S.NormalBtn {...props}>
      {props.icon && <img src={props.icon} width="23px" />}
      {children}
    </S.NormalBtn>
  );
}

export function TabMenuBtn({ children, fixed, num, onClick }: TabMenuBtnProps) {
  return (
    <S.TabMenuBtn fixed={fixed?.toString()} onClick={onClick}>
      {children}
      {num && <S.NumCircle>{num}</S.NumCircle>}
    </S.TabMenuBtn>
  );
}
