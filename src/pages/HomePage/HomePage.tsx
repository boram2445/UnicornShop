import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  axiosGetProducts,
  selectAllProducts,
  getProductStatus,
} from "../../reducers/getProductSlice";
import ProductCard from "../../components/home/ProductCard/ProductCard";
import Navbar from "../../components/common/Navbar/Navbar";
import Carousel from "../../components/home/Carousel/Carousel";
import Footer from "../../components/common/Footer/Footer";
import * as S from "./homePageStyle";

function HomePage() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getProductStatus);
  const products = useAppSelector(selectAllProducts);
  useEffect(() => {
    if (status === "idle") {
      dispatch(axiosGetProducts());
    }
  }, [status, dispatch]);
  return (
    <>
      <Navbar />
      <Carousel />
      <S.ProductContainer>
        <S.ProductLists>
          {products &&
            products.map((product) => <ProductCard key={product.product_id} product={product} />)}
        </S.ProductLists>
      </S.ProductContainer>
      <Footer />
    </>
  );
}

export default HomePage;
