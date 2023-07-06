import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  padding: 4.4rem 22px 9.6rem;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleText = styled.h3`
  font-size: 3.2rem;
  font-weight: 700;
  span {
    margin-left: 1.6rem;
    font-weight: 500;
    color: var(--color-main);
  }
`;

const ContentWrap = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 25rem 1fr;
  gap: 3rem;
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export { Container, TitleWrap, TitleText, ContentWrap, BtnWrap };
