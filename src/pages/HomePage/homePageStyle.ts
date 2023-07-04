import styled from "styled-components";

const ProductSection = styled.section`
  margin: 0 auto;
  padding: 80px 30px 0;
  max-width: 1250px;
`;

const ProductLists = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6vh 3vw;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 580px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export { ProductSection, ProductLists };
