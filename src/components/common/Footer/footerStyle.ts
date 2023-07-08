import styled from "styled-components";

const FooterLayout = styled.footer`
  padding: 3rem 0 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-brightGrey);
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
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px var(--color-grey) solid;
`;

const PolicyList = styled.ul`
  display: flex;
  gap: 20px;
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
  li:hover {
    opacity: 0.8;
  }
`;

const BottomWrap = styled.article`
  align-self: flex-start;
  margin-top: 20px;
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: var(--color-darkGrey);
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
