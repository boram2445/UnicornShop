import styled from "styled-components";

const CartPageLayout = styled.section`
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
  width: 1280px;
  height: 60px;
  padding: 19px 0 18px;
  background-color: #f2f2f2;
  border-radius: 10px;
  strong {
    font-size: 1.8rem;
    line-height: 2.2rem;
  }
`;

const InfoText = styled.strong`
  position: absolute;
  left: 364px;
`;

const CountText = styled.strong`
  position: absolute;
  left: 810px;
`;

const PriceText = styled.strong`
  position: absolute;
  right: 131px;
`;

const CartList = styled.ul``;

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

export {
  CartPageLayout,
  CartPageText,
  CartInfoBox,
  InfoText,
  CountText,
  PriceText,
  CartList,
  NoItemBox,
};
