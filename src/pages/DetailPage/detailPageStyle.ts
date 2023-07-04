import styled from "styled-components";
import { ThumbContainer } from "../../components/home/ProductCard/productCardStyle";

const DetailLayout = styled.main`
  margin: 5rem auto;
  padding: 0 3rem;
  max-width: 120rem;
`;

const ProductWrap = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.9fr 1fr;
    gap: 3rem;
  }
`;

const ImageBox = styled(ThumbContainer)`
  width: 100%;
  padding-top: 0;
`;

const ButtonWrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 14px;
`;

export { DetailLayout, ProductWrap, ImageBox, ButtonWrap };
