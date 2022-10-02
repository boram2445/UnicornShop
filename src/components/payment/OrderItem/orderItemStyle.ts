import styled from "styled-components";
import { ShopText, ProductText } from "../../cart/CartItem/cartItemStyle";

const OrederItem = styled.li`
  margin-top: 16px;
  padding: 8px 8px 17px 8px;
  display: grid;
  grid-template-columns: 140px 3fr 1fr 1fr 1fr;
  border-bottom: 1px solid var(--color-grey);
`;

const ImageBox = styled.div`
  width: 104px;
  height: 104px;
  border-radius: 10px;
  img {
    width: 100%;
    height: 104px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const CountText = styled(ShopText)``;

const DisCountText = styled(ShopText)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShipText = styled(DisCountText)``;

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
  ImageBox,
  ShopText,
  ProductText,
  CountText,
  DisCountText,
  ShipText,
  ItemPayText,
};
