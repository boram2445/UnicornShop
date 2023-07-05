import styled from "styled-components";
import { ShopText, ProductText } from "../../cart/CartItem/cartItemStyle";

const OrederItem = styled.li`
  width: 100%;
  margin-top: 1.6rem;
  padding: 0.8rem 0.8rem 1.7rem 0.8rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--color-grey);
  @media screen and (max-width: 768px) {
    padding: 0.6rem 0.6rem 1.5rem 0.6rem;
    grid-template-columns: 2fr 1fr;
  }
`;

const ItemInfoBox = styled.div`
  display: grid;
  grid-template-columns: 13.4rem 1fr;
`;

const PriceBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageBox = styled.div<{ imgUrl: string }>`
  margin: 0 3rem 0 1rem;
  width: 10.4rem;
  height: 10.4rem;
  background: url(${({ imgUrl }) => imgUrl}) no-repeat center;
  background-size: cover;
  border: 1px solid var(--color-grey);
  border-radius: 1rem;
`;

const CountText = styled(ShopText)``;

const DisCountText = styled(ShopText)`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ShipText = styled(DisCountText)`
  font-size: 1.6rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ItemPayText = styled.strong`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  strong {
    margin-right: 0.4rem;
    font-weight: 700;
    font-size: 1.8rem;
  }
`;

export {
  OrederItem,
  ItemInfoBox,
  PriceBox,
  ImageBox,
  ShopText,
  ProductText,
  CountText,
  DisCountText,
  ShipText,
  ItemPayText,
};
