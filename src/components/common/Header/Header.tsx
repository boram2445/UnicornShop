import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getToken, logout, getLoginUserType } from "../../../features/loginSlice";
import { resetAll } from "../../../features/registerSlice";
import { NormalBtn } from "../Button/Button";
import ArrowModal from "../ArrowModal/ArrowModal";
import Modal from "../Modal/Modal";
import { openModal, selectOpenState } from "../../../features/modalSlice";
import logo from "../../../assets/icons/Logo-hodu.svg";
import searchIcon from "../../../assets/icons/search.svg";
import shoppingBag from "../../../assets/icons/icon-shopping-bag.svg";
import { ReactComponent as CartIcon } from "../../../assets/icons/icon-shopping-cart.svg";
import { ReactComponent as UserIcon } from "../../../assets/icons/icon-user.svg";

import * as S from "./headerStyle";

export function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const TOKEN = useAppSelector(getToken);
  const USER = useAppSelector(getLoginUserType);
  const modal = useAppSelector(selectOpenState);

  //로그아웃 함수
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetAll());
    navigate("/");
  };

  const [onArrowModal, setArrowModal] = useState(false);
  const [searchContent, setSearchContent] = useState("");

  //화살포 선택 모달 정보
  const arrowList = [
    { label: "마이페이지", onClick: () => navigate("/mypage") },
    { label: "로그아웃", onClick: () => onLogout() },
  ];

  //헤더 아이콘 색상 변경
  const cartIconColor = pathname.includes("cart") ? "#FA897B" : "#767676";
  const myPageIconColor = pathname.includes("mypage") || onArrowModal ? "#FA897B" : "#767676";

  //검색
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
    <>
      {modal ? (
        <Modal onClickYes={() => navigate("/login")}>
          로그인이 필요한 서비스 입니다. <br /> 로그인 하시겠습니까?
        </Modal>
      ) : null}
      <S.HeaderContainer>
        <S.HeaderContents>
          <S.LeftWrap>
            <S.Logo logoUrl={logo} onClick={() => navigate("/")} />
            <S.Input type="text" placeholder="상품을 검색해보세요!" onChange={handleSearch} />
            <S.InputBtn type="button" onClick={handleSerachBtn} icon={searchIcon} />
          </S.LeftWrap>
          <S.RightWrap>
            {USER === "SELLER" ? (
              <>
                <S.MyPageWrap>
                  <S.NavButton onClick={() => setArrowModal(!onArrowModal)} color={myPageIconColor}>
                    <UserIcon stroke={myPageIconColor} />
                    <span>마이페이지</span>
                  </S.NavButton>
                  <ArrowModal on={onArrowModal} list={arrowList} />
                </S.MyPageWrap>
                <NormalBtn
                  onClick={() => navigate("/center")}
                  icon={shoppingBag}
                  width="168px"
                  padding="10px 20px"
                >
                  판매자 센터
                </NormalBtn>
              </>
            ) : (
              <>
                <S.NavButton
                  onClick={TOKEN ? () => navigate("/cart") : () => dispatch(openModal("예"))}
                  color={cartIconColor}
                >
                  <CartIcon stroke={cartIconColor} />
                  <span>장바구니</span>
                </S.NavButton>
                <S.MyPageWrap>
                  <S.NavButton
                    onClick={TOKEN ? () => setArrowModal(!onArrowModal) : () => navigate("/login")}
                    color={myPageIconColor}
                  >
                    <UserIcon stroke={myPageIconColor} />
                    <span>{TOKEN ? "마이페이지" : "로그인"}</span>
                  </S.NavButton>
                  <ArrowModal on={onArrowModal} list={arrowList} />
                </S.MyPageWrap>
              </>
            )}
          </S.RightWrap>
        </S.HeaderContents>
      </S.HeaderContainer>
    </>
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
