import styled from "styled-components";

const NavContainer = styled.header`
  box-shadow: 0px 4px 5px -4px #0000001a;
`;

const NavContents = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  padding: 22px;
  display: flex;
  justify-content: space-between;
`;

const LeftWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const NavLogo = styled.h1`
  cursor: pointer;
`;

const NavInput = styled.input`
  width: 400px;
  margin-left: 30px;
  padding: 13px 0 13px 22px;
  border: #fa897b 2px solid;
  border-radius: 50px;
  font-size: 1.6rem;
`;

const InputBtn = styled.button`
  padding: 0;
  height: 28px;
  position: absolute;
  right: 22px;
`;

const RightWrap = styled.ul`
  display: flex;
  gap: 26px;
`;

const NavButton = styled.li`
  width: 46px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  color: #767676;
  font-size: 1.2rem;
`;

export { NavContainer, NavContents, LeftWrap, RightWrap, NavLogo, NavInput, InputBtn, NavButton };
