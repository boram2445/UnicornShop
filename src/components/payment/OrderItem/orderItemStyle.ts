import styled from "styled-components";
import { ShopText, ProductText } from "../../cart/CartItem/cartItemStyle";

const OrederItem = styled.li`
  width: 100%;
  margin-top: 16px;
  padding: 8px 8px 17px 8px;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  border-bottom: 1px solid var(--color-grey);
`;

const ItemInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const ImageBox = styled.div<{ imgUrl?: string }>`
  margin: 0 30px 0 10px;
  width: 104px;
  height: 104px;
  background: url(${({ imgUrl }) => imgUrl}) no-repeat center;
  background-size: cover;
  border: 1px solid var(--color-grey);
  border-radius: 10px;
`;

const CountText = styled(ShopText)``;

const DisCountText = styled(ShopText)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShipText = styled(DisCountText)`
  font-size: 1.6rem;
`;

const ItemPayText = styled.strong`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.3rem;
`;

export {
  OrederItem,
  ItemInfoBox,
  ImageBox,
  ShopText,
  ProductText,
  CountText,
  DisCountText,
  ShipText,
  ItemPayText,
};
