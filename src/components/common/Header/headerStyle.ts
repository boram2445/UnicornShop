import styled, { css } from "styled-components";
import DeleteIcon from "../../../assets/icons/icon-delete.svg";
import ArrowDownIcon from "../../../assets/icons/icon-Triangle-down.svg";
import ArrowUpIcon from "../../../assets/icons/icon-Triangle-up.svg";

const HeaderContainer = styled.header`
  box-shadow: var(--shadow-light);
`;

const HeaderContents = styled.div`
  margin: 0 auto;
  max-width: 1380px;
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;
`;

const LeftWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const RightWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Logo = styled.h1<{ logoUrl: string }>`
  width: 12.4rem;
  height: 3.8rem;
  background: url(${({ logoUrl }) => logoUrl}) no-repeat center;
  background-size: cover;
  cursor: pointer;
`;

const SearchForm = styled.form`
  position: relative;
`;

const Input = styled.input<{ text?: string; icon?: string }>`
  position: relative;
  width: 45rem;
  padding: 1.2rem 8rem 1.2rem 2.2rem;
  border: 2px solid var(--color-main);
  border-radius: 5rem;
  font-size: 1.6rem;

  //삭제 버튼 커스텀
  &[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    position: absolute;
    right: -1.5rem;
    padding: 0 11rem 0 2rem;
    width: 2rem;
    height: 2rem;
    background: url(${DeleteIcon}) center center no-repeat;
    cursor: pointer;
  }
`;

const InputBtn = styled.button<{ icon: string }>`
  position: absolute;
  right: 2.2rem;
  top: calc(50% - 15px);
  width: 2.8rem;
  height: 2.8rem;
  padding: 0;
  background: url(${({ icon }) => icon}) no-repeat center;
`;

const NavBtn = styled.button`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  cursor: pointer;
  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
  &:hover {
    background-color: var(--color-brightGrey);
  }
`;

const UserBtn = styled(NavBtn)<{ arrow?: string }>`
  padding-left: ${({ arrow }) => (arrow ? " 1.5rem" : "1rem")};
  width: ${({ arrow }) => (arrow ? "14rem" : "11rem")};
  display: flex;
  align-items: center;
  gap: ${({ arrow }) => (arrow ? "0.5rem" : "0rem")};
  border-radius: 2rem;
  font-size: 1.2rem;
  small {
    width: 7rem;
  }
  ${({ arrow }) => {
    if (arrow === "open") {
      return css`
        background: url(${ArrowDownIcon}) no-repeat right 10px center;
        background-color: var(--color-brightGrey);
      `;
    } else if (arrow === "close") {
      return css`
        background: url(${ArrowUpIcon}) no-repeat right 10px center;
      `;
    } else {
      return css`
        justify-content: center;
      `;
    }
  }}
`;

const UerModalWrap = styled.div`
  position: relative;
`;

// Center Header
const CenterContents = styled(HeaderContents)`
  align-items: center;
  justify-content: start;
`;

const SmallLogo = styled(Logo)`
  width: 8rem;
  height: 24px;
`;

const TitleText = styled.h2`
  margin-left: 16px;
  font-size: 3rem;
  font-weight: 500;
  line-height: 3.7rem;
`;

export {
  HeaderContainer,
  HeaderContents,
  LeftWrap,
  RightWrap,
  Logo,
  SearchForm,
  Input,
  InputBtn,
  NavBtn,
  UserBtn,
  SmallLogo,
  TitleText,
  CenterContents,
  UerModalWrap,
};
