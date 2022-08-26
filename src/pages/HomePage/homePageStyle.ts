import styled from "styled-components";

const ProductLists = styled.ul`
  display: grid;
  grid-template-columns: 380px 380px 380px;
  gap: 70px;
`;

const ProductContainer = styled.div`
  margin: 80px auto 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export { ProductLists, ProductContainer };
