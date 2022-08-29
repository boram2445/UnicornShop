import React from "react";
import { useNavigate } from "react-router-dom";
import {
  NavContainer,
  NavContents,
  LeftWrap,
  NavLogo,
  NavInput,
  InputBtn,
  RightWrap,
  NavButton,
} from "./navbarStyle";
import logo from "../../assets/Logo-hodu.svg";
import cartIcon from "../../assets/icon-shopping-cart.svg";
import userIcon from "../../assets/icon-user.svg";
import searchIcon from "../../assets/search.svg";

function Navbar() {
  const navigate = useNavigate();
  return (
    <NavContainer>
      <NavContents>
        <LeftWrap>
          <NavLogo onClick={() => navigate("/")}>
            <img src={logo} alt="유니콘 마켓 로고" />
          </NavLogo>
          <NavInput type="text" placeholder="상품을 검색해보세요!" />
          <InputBtn type="button">
            <img src={searchIcon} alt="검색" />
          </InputBtn>
        </LeftWrap>
        <RightWrap>
          <NavButton onClick={() => navigate("/")}>
            <img src={cartIcon} />
            <span>장바구니</span>
          </NavButton>
          <NavButton onClick={() => navigate("/")}>
            <img src={userIcon} />
            <span>로그인</span>
          </NavButton>
        </RightWrap>
      </NavContents>
    </NavContainer>
  );
}

export default Navbar;
