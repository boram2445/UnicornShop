import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  padding: 44px 22px 96px;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleText = styled.h3`
  font-size: 3.2rem;
  font-weight: 700;
  span {
    margin-left: 16px;
    font-weight: 500;
    color: var(--color-main);
  }
`;

const ContentWrap = styled.div`
  margin-top: 42px;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 30px;
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export { Container, TitleWrap, TitleText, ContentWrap, BtnWrap };
