import styled from "styled-components";

const CartPageLayout = styled.section`
  width: 100%;
  max-width: 1280px;
  padding: 0 30px;
  margin: 54px auto 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartPageText = styled.h2`
  text-align: center;
  font-size: 3.6rem;
  line-height: 4.4rem;
  font-weight: 700;
`;

const CartInfoBox = styled.div`
  position: relative;
  margin: 52px auto 32px;
  width: 100%;
  height: 60px;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  gap: 30px;
  padding: 19px 100px 18px 90px;
  background-color: var(--color-brightGrey);
  border-radius: 10px;
  strong {
    font-size: 1.8rem;
    line-height: 2.2rem;
    text-align: center;
  }
`;

const InfoText = styled.strong`
  position: absolute;
  left: 364px;
`;

const CartList = styled.ul`
  width: 100%;
  & > button {
    margin: 10px 0 0 10px;
  }
`;

const NoItemBox = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 2.3rem;
  }
  small {
    display: block;
    margin-top: 17px;
    color: var(--color-darkGrey);
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
`;

export { CartPageLayout, CartPageText, CartInfoBox, InfoText, CartList, NoItemBox };
