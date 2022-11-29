import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./headerStyle";
import logo from "../../../assets/icons/Logo-hodu.svg";
import cartIcon from "../../../assets/icons/icon-shopping-cart.svg";
import userIcon from "../../../assets/icons/icon-user.svg";
import searchIcon from "../../../assets/icons/search.svg";
import shoppingBag from "../../../assets/icons/icon-shopping-bag.svg";
import { getToken, logout, getLoginUserType } from "../../../features/loginSlice";
import { resetAll } from "../../../features/registerSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NormalBtn } from "../Button/Button";
import ArrowModal from "../ArrowModal/ArrowModal";

export function Header() {
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

  return (
    <S.HeaderContainer>
      <S.HeaderContents>
        <S.LeftWrap>
          <S.Logo onClick={() => navigate("/")}>
            <img src={logo} alt="유니콘 마켓 로고" />
          </S.Logo>
          <S.Input type="text" placeholder="상품을 검색해보세요!" onChange={handleSearch} />
          <S.InputBtn type="button" onClick={handleSerachBtn}>
            <img src={searchIcon} alt="검색" />
          </S.InputBtn>
        </S.LeftWrap>
        <S.RightWrap>
          {TOKEN ? (
            USER === "BUYER" ? (
              <>
                <S.NavButton onClick={() => navigate("/cart")}>
                  <img src={cartIcon} />
                  <span>장바구니</span>
                </S.NavButton>
                <S.NavButton onClick={() => setArrowModal(!onArrowModal)}>
                  <img src={userIcon} />
                  <span>마이페이지</span>
                  <ArrowModal on={onArrowModal} list={arrowList} />
                </S.NavButton>
              </>
            ) : (
              <>
                <S.NavButton onClick={() => setArrowModal(!onArrowModal)}>
                  <img src={userIcon} />
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
            <S.NavButton onClick={() => navigate("/login")}>
              <img src={userIcon} />
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
        <S.SmallLogo onClick={() => navigate("/")}>
          <img src={logo} alt="유니콘 마켓 로고" />
        </S.SmallLogo>
        <S.TitleText>판매자 센터</S.TitleText>
      </S.CenterContents>
    </S.HeaderContainer>
  );
}
