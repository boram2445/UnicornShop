import styled from "styled-components";

const CartItemArticle = styled.article`
  margin-top: 5px;
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  gap: 30px;
  align-items: center;
  justify-content: center;
  padding: 18px 88px 18px 88px;
  border: 2px solid var(--color-brightGrey);
  border-radius: 10px;
  position: relative;
`;

const ProductInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const ImageBox = styled.div<{ imgUrl?: string }>`
  margin-right: 3.6rem;
  width: 16rem;
  height: 16rem;
  border-radius: 1rem;
  background: url(${({ imgUrl }) => imgUrl}) no-repeat center;
  background-size: cover;
`;

const ShopText = styled.p`
  font-size: 1.4rem;
  line-height: 1.8rem;
  color: var(--color-darkGrey);
`;

const ProductText = styled.strong`
  display: block;
  margin: 10px auto;
  font-size: 1.8rem;
  line-height: 2.2rem;
`;

const PriceText = styled.p`
  margin-bottom: 40px;
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: 700;
`;

const ShipText = styled(ShopText)``;

const OrderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

const PriceAllText = styled.p`
  font-size: 1.8rem;
  line-height: 2.3rem;
  color: var(--color-red);
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

export {
  CartItemArticle,
  ProductInfoBox,
  ImageBox,
  ShopText,
  ProductText,
  PriceText,
  ShipText,
  PriceAllText,
  OrderBox,
  DeleteBtn,
};
