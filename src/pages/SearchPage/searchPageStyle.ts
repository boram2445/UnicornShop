import styled from "styled-components";

const Container = styled.main`
  padding: 1rem 2rem;
`;

const Title = styled.h2`
  margin: 2rem 1rem;
  font-size: 2rem;
  span {
    font-weight: 600;
    color: var(--color-main);
  }
`;

const ProductLists = styled.ul`
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6vh 3vw;
`;

const DescriptionBox = styled.div`
  min-height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  strong {
    margin-bottom: 4rem;
    font-size: 2rem;
    span {
      font-weight: 600;
      color: var(--color-main);
    }
  }
  ul {
    letter-spacing: 1px;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: var(--color-darkGrey);
  }
`;

export { Container, Title, ProductLists, DescriptionBox };
