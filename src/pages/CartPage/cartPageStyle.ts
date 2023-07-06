import styled from "styled-components";

const CartPageLayout = styled.main`
  margin: 5.4rem auto 16rem;
  padding: 0 3rem;
  width: 100%;
  max-width: 128rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartPageTitle = styled.h2`
  text-align: center;
  font-size: 3.6rem;
  font-weight: 700;
`;

const InfoText = styled.strong`
  position: absolute;
  left: 36.4rem;
`;

const CartList = styled.ul`
  width: 100%;
  & > button {
    margin: 1.5rem 0 0 1rem;
  }
`;

const NoItemBox = styled.div`
  margin-top: 18rem;
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
    margin-top: 1.7rem;
    color: var(--color-darkGrey);
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
`;

export { CartPageLayout, CartPageTitle, InfoText, CartList, NoItemBox };
