import styled from "styled-components";

const FooterLayout = styled.footer`
  position: absolute;
  bottom: 0;
  padding: 60px 0 63px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
`;

const ContentBox = styled.div`
  width: 100%;
  max-width: 1380px;
  padding: 0 50px;
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 22px;
  border-bottom: 1px #c4c4c4 solid;
`;

const PolicyList = styled.ul`
  display: flex;
  gap: 32px;
  font-size: 1.4rem;
  strong {
    font-weight: 700;
  }
  li:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const SnsBtnList = styled.ul`
  display: flex;
  gap: 14px;
`;

const BottomWrap = styled.article`
  align-self: flex-start;
  margin-top: 30px;
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: #767676;
  p {
    font-weight: 700;
  }
  dl {
    display: flex;
  }
  dt::after {
    display: inline-block;
    padding: 0 4px;
    content: ":";
  }
  dd:nth-child(3)::before {
    display: inline-block;
    padding: 0 4px;
    content: "|";
  }
`;

export { FooterLayout, ContentBox, TopWrap, PolicyList, SnsBtnList, BottomWrap };
