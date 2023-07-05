import styled from "styled-components";

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr 8rem 8rem;
  gap: 2rem;
  align-items: center;
  padding: 1rem 3rem 1.1rem;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-grey);
`;

const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const ImageBox = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--color-grey);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductText = styled.p`
  font-size: 1.6rem;
  line-height: 2rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LightText = styled.p<{ textAlign?: string }>`
  font-size: 1.4rem;
  line-height: 2rem;
  color: var(--color-darkGrey);
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "start")};
  strong {
    font-weight: 500;
  }
`;

const PriceText = styled.p`
  text-align: center;
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-weight: 500;
`;

export { ItemContainer, InfoWrap, ImageBox, InfoBox, ProductText, LightText, PriceText };
