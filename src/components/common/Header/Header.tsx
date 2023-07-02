import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { logout, getAuthState } from "../../../features/loginSlice";
import { openModal, selectOpenState } from "../../../features/modalSlice";
import { fetchSearchProducts, searchReset } from "../../../features/searchSlice";
import { NormalBtn } from "../Button/Button";
import ArrowModal from "../ArrowModal/ArrowModal";
import Modal from "../Modal/Modal";

import { ReactComponent as CartIcon } from "../../../assets/icons/icon-shopping-cart.svg";
import { ReactComponent as UserIcon } from "../../../assets/icons/icon-user.svg";
import logo from "../../../assets/icons/Logo-hodu.svg";
import searchIcon from "../../../assets/icons/search.svg";
import shoppingBag from "../../../assets/icons/icon-shopping-bag.svg";
import * as S from "./headerStyle";

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const { userName, token, userType } = useAppSelector(getAuthState);

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const modal = useAppSelector(selectOpenState);

  const [onArrowModal, setArrowModal] = useState(false);
  const [searchContent, setSearchContent] = useState("");

  useEffect(() => {
    if (!pathname.includes("search")) {
      inputRef.current.value = "";
      dispatch(searchReset());
      setSearchContent("");
    }
  }, [pathname]);

  //검색
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchContent(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchContent) return;
    dispatch(fetchSearchProducts(searchContent));
    navigate(`/search/${searchContent}`);
  };

  //로그아웃
  const onLogout = () => {
    setArrowModal(false);
    dispatch(logout());
    navigate("/");
  };

  const needLoginModal = (
    <Modal onClickYes={() => navigate("/login")}>
      로그인이 필요한 서비스 입니다. <br /> 로그인 하시겠습니까?
    </Modal>
  );

  //모달 정보
  const arrowList = [
    { label: "마이페이지", onClick: () => navigate("/mypage") },
    { label: "로그아웃", onClick: () => onLogout() },
  ];

  //헤더 아이콘 색상 변경
  const onArrowIcon = !token ? undefined : onArrowModal ? "open" : "close";

  return (
    <>
      {!token && modal ? needLoginModal : null}
      <S.HeaderContainer>
        <S.HeaderContents>
          <S.LeftWrap>
            <S.Logo logoUrl={logo} onClick={() => navigate("/")} />
            <S.SearchForm onSubmit={handleSubmit}>
              <S.Input
                type="search"
                placeholder="상품을 검색해보세요!"
                onChange={handleChange}
                ref={inputRef}
              />
              <S.InputBtn type="submit" icon={searchIcon} />
            </S.SearchForm>
          </S.LeftWrap>
          <S.RightWrap>
            {userType === "SELLER" ? (
              <>
                <NormalBtn
                  onClick={() => navigate("/center")}
                  icon={shoppingBag}
                  width="168px"
                  padding="10px 20px"
                >
                  판매자 센터
                </NormalBtn>
                <S.UerModalWrap>
                  <S.UserBtn onClick={() => setArrowModal(!onArrowModal)} arrow={onArrowIcon}>
                    <UserIcon stroke={"black"} />
                    <small>{token ? userName : "로그인"}</small>
                  </S.UserBtn>
                  <ArrowModal on={onArrowModal} list={arrowList} />
                </S.UerModalWrap>
              </>
            ) : (
              <>
                <S.NavBtn
                  onClick={token ? () => navigate("/cart") : () => dispatch(openModal("예"))}
                >
                  <CartIcon stroke={"black"} />
                </S.NavBtn>
                <S.UerModalWrap>
                  <S.UserBtn
                    onClick={token ? () => setArrowModal(!onArrowModal) : () => navigate("/login")}
                    arrow={onArrowIcon}
                  >
                    <UserIcon stroke={"black"} />
                    <small className="txt-ellipsis">{token ? userName : "로그인"}</small>
                  </S.UserBtn>
                  <ArrowModal on={onArrowModal} list={arrowList} />
                </S.UerModalWrap>
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
