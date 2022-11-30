import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken, logout, getLoginUserType } from "../../../features/loginSlice";
import { resetAll } from "../../../features/registerSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NormalBtn } from "../Button/Button";
import logo from "../../../assets/icons/Logo-hodu.svg";
import searchIcon from "../../../assets/icons/search.svg";
import shoppingBag from "../../../assets/icons/icon-shopping-bag.svg";
import { ReactComponent as CartIcon } from "../../../assets/icons/icon-shopping-cart.svg";
import { ReactComponent as UserIcon } from "../../../assets/icons/icon-user.svg";
import ArrowModal from "../ArrowModal/ArrowModal";
import * as S from "./headerStyle";

export function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const TOKEN = useAppSelector(getToken);
  const USER = useAppSelector(getLoginUserType);

  const onLogout = () => {
    dispatch(logout());
    dispatch(resetAll());
    navigate("/");
  };

  const [onArrowModal, setArrowModal] = useState(false);
  const arrowList = [
    { label: "마이페이지", onClick: () => navigate("/mypage") },
    { label: "로그아웃", onClick: () => onLogout() },
  ];

  const [searchContent, setSearchContent] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  const handleSerachBtn = () => {
    console.log(searchContent);
    if (searchContent) {
      // dispatch(fetchGetSearchProducts(searchContent));
    }
  };

  const CartIconColor = pathname.includes("cart") ? "#FA897B" : "#767676";
  const MyPageIconColor = pathname.includes("mypage") || onArrowModal ? "#FA897B" : "#767676";

  return (
    <S.HeaderContainer>
      <S.HeaderContents>
        <S.LeftWrap>
          <S.Logo logoUrl={logo} onClick={() => navigate("/")} />
          <S.Input type="text" placeholder="상품을 검색해보세요!" onChange={handleSearch} />
          <S.InputBtn type="button" onClick={handleSerachBtn} icon={searchIcon} />
        </S.LeftWrap>
        <S.RightWrap>
          {TOKEN ? (
            USER === "BUYER" ? (
              <>
                <S.NavButton onClick={() => navigate("/cart")} color={CartIconColor}>
                  <CartIcon stroke={CartIconColor} />
                  <span>장바구니</span>
                </S.NavButton>
                <S.NavButton onClick={() => setArrowModal(!onArrowModal)} color={MyPageIconColor}>
                  <UserIcon stroke={MyPageIconColor} />
                  <span>마이페이지</span>
                  <ArrowModal on={onArrowModal} list={arrowList} />
                </S.NavButton>
              </>
            ) : (
              <>
                <S.NavButton onClick={() => setArrowModal(!onArrowModal)} color={MyPageIconColor}>
                  <UserIcon stroke={MyPageIconColor} />
                  <span>마이페이지</span>
                  <ArrowModal on={onArrowModal} list={arrowList} />
                </S.NavButton>
                <NormalBtn
                  onClick={() => navigate("/center")}
                  icon={shoppingBag}
                  width="168px"
                  padding="10px 20px"
                >
                  판매자 센터
                </NormalBtn>
              </>
            )
          ) : (
            <S.NavButton onClick={() => navigate("/login")} color={MyPageIconColor}>
              <UserIcon stroke={MyPageIconColor} />
              <span>로그인</span>
            </S.NavButton>
          )}
        </S.RightWrap>
      </S.HeaderContents>
    </S.HeaderContainer>
  );
}

export function CenterHeader() {
  const navigate = useNavigate();

  return (
    <S.HeaderContainer>
      <S.CenterContents>
        <S.SmallLogo logoUrl={logo} onClick={() => navigate("/")} />
        <S.TitleText>판매자 센터</S.TitleText>
      </S.CenterContents>
    </S.HeaderContainer>
  );
}
