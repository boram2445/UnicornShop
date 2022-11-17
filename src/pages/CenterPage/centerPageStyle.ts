import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  max-width: 1540px;
  padding: 44px 22px 96px;
`;

const TitleText = styled.h3`
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 4.4rem;
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

export { Container, TitleText, ContentWrap, BtnWrap };
