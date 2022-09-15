import styled from "styled-components";

const CartPageLayout = styled.section`
  margin: 54px auto 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartPageText = styled.h2`
  font-size: 3.6rem;
  line-height: 4.4rem;
  font-weight: 700;
`;

const CartInfoBox = styled.div`
  position: relative;
  margin: 52px auto 32px;
  width: 1280px;
  padding: 19px 0 18px;
  background-color: #f2f2f2;
  border-radius: 10px;
  strong {
    font-size: 1.8rem;
    line-height: 2.2rem;
  }
`;

const CartList = styled.ul``;

export { CartPageLayout, CartPageText, CartInfoBox, CartList };
