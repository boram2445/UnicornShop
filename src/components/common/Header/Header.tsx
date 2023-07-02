import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchSearchProducts, searchReset } from "../../../features/searchSlice";
import { getToken } from "../../../features/loginSlice";
import IconNav from "./IconNav";

import logo from "../../../assets/icons/Logo-hodu.svg";
import searchIcon from "../../../assets/icons/search.svg";
import * as S from "./headerStyle";
import { fetchGetCartList } from "../../../features/cartListSlice";

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const TOKEN = useAppSelector(getToken);

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [searchContent, setSearchContent] = useState("");

  useEffect(() => {
    TOKEN && dispatch(fetchGetCartList(TOKEN));
  }, [TOKEN]);

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

  return (
    <>
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
            <IconNav />
          </S.RightWrap>
        </S.HeaderContents>
      </S.HeaderContainer>
    </>
  );
}

// 판매자 센터 헤더
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
