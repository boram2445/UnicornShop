import styled from "styled-components";

const LoginSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.h1`
  margin-bottom: 30px;
  img {
    width: 238px;
    height: 74px;
  }
`;

const LinkBox = styled.div`
  margin-top: 30px;
  font-size: 1.6rem;
  line-height: 2rem;
  span:hover {
    text-decoration: underline;
  }
  a:first-child::after {
    margin: 0 10px;
    display: inline-block;
    content: "";
    width: 1px;
    height: 16px;
    vertical-align: middle;
    background-color: var(--color-black);
    cursor: default;
  }
`;

export { LoginSection, Logo, LinkBox };
