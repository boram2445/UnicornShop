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
`;

export { ProductSection, ProductLists };
