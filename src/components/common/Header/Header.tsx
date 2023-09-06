import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchSearchProducts, searchReset } from "../../../reducer/searchSlice";
import { fetchGetCartList, getCartQuantity } from "../../../reducer/cartListSlice";
import IconNav from "./IconNav";

import logo from "../../../assets/icons/logo-unicorn.svg";
import searchIcon from "../../../assets/icons/search.svg";
import { useUser } from "../../../hooks/useUser";
import * as S from "./headerStyle";

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cartQuantity = useAppSelector(getCartQuantity);
  const { isLogined, userType } = useUser();

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [searchContent, setSearchContent] = useState("");

  useEffect(() => {
    isLogined && userType === "BUYER" && dispatch(fetchGetCartList());
  }, [isLogined]);

  useEffect(() => {
    if (!pathname.includes("search") && searchContent) {
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

  let content;
  if (pathname.includes("center"))
    content = <S.TitleText style={{ margin: 0 }}>판매자 센터</S.TitleText>;
  else
    content = (
      <S.SearchForm onSubmit={handleSubmit}>
        <S.Input
          type="search"
          placeholder="상품을 검색해보세요!"
          onChange={handleChange}
          ref={inputRef}
        />
        <S.InputBtn type="submit" icon={searchIcon} />
      </S.SearchForm>
    );

  return (
    <>
      <S.HeaderContainer>
        <S.HeaderContents>
          <S.LeftWrap>
            <S.Logo logoUrl={logo} onClick={() => navigate("/")} />
            {content}
          </S.LeftWrap>
          <S.RightWrap>
            <IconNav cartQuantity={cartQuantity} />
          </S.RightWrap>
        </S.HeaderContents>
      </S.HeaderContainer>
    </>
  );
}

export default Header;
