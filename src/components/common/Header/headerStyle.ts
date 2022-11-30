import styled from "styled-components";

const HeaderContainer = styled.header`
  box-shadow: 0px 4px 5px -4px #0000001a;
`;

const HeaderContents = styled.div`
  margin: 0 auto;
  max-width: 1380px;
  padding: 22px;
  display: flex;
  justify-content: space-between;
`;

const LeftWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Logo = styled.h1<{ logoUrl: string }>`
  width: 124px;
  height: 38px;
  background: url(${({ logoUrl }) => logoUrl}) no-repeat center;
  background-size: cover;
  cursor: pointer;
`;

const Input = styled.input`
  width: 400px;
  margin-left: 30px;
  padding: 13px 0 13px 22px;
  border: #fa897b 2px solid;
  border-radius: 50px;
  font-size: 1.6rem;
`;

const InputBtn = styled.button<{ icon: string }>`
  padding: 0;
  width: 28px;
  height: 28px;
  position: absolute;
  right: 22px;
  background: url(${({ icon }) => icon}) no-repeat center;
`;

const RightWrap = styled.div`
  display: flex;
  gap: 26px;
`;

const NavButton = styled.button<{ color?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  position: relative;
  max-width: 60px;
  cursor: pointer;
  font-size: 1.2rem;
  span {
    color: ${({ color }) => color};
  }
`;

// Center Header
const CenterContents = styled(HeaderContents)`
  max-width: 1380px;
  align-items: center;
  justify-content: start;
`;

const SmallLogo = styled(Logo)`
  width: 80px;
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
  Input,
  InputBtn,
  NavButton,
  SmallLogo,
  TitleText,
  CenterContents,
};
