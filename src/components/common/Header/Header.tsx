import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./headerStyle";
import logo from "../../../assets/icons/Logo-hodu.svg";
import cartIcon from "../../../assets/icons/icon-shopping-cart.svg";
import userIcon from "../../../assets/icons/icon-user.svg";
import searchIcon from "../../../assets/icons/search.svg";
import { getToken, logout, reset } from "../../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NormalBtn } from "../Button/Button";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const TOKEN = useAppSelector(getToken);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <S.NavContainer>
      <S.NavContents>
        <S.LeftWrap>
          <S.NavLogo onClick={() => navigate("/")}>
            <img src={logo} alt="유니콘 마켓 로고" />
          </S.NavLogo>
          <S.NavInput type="text" placeholder="상품을 검색해보세요!" />
          <S.InputBtn type="button">
            <img src={searchIcon} alt="검색" />
          </S.InputBtn>
        </S.LeftWrap>
        <S.RightWrap>
          <S.NavButton onClick={() => navigate("/cart")}>
            <img src={cartIcon} />
            <span>장바구니</span>
          </S.NavButton>
          {TOKEN ? (
            <NormalBtn type="button" size="ssmall" onClick={onLogout}>
              로그아웃
            </NormalBtn>
          ) : (
            <S.NavButton onClick={() => navigate("/login")}>
              <img src={userIcon} />
              <span>마이페이지</span>
            </S.NavButton>
          )}
        </S.RightWrap>
      </S.NavContents>
    </S.NavContainer>
  );
}

export default Header;
