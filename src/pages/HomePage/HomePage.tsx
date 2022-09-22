import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchGetProducts, selectAllProducts, getProductStatus } from "../../reducers/productSlice";
import ProductCard from "../../components/home/ProductCard/ProductCard";
import Navbar from "../../components/common/Navbar/Navbar";
import Carousel from "../../components/home/Carousel/Carousel";
import Footer from "../../components/common/Footer/Footer";
import * as S from "./homePageStyle";

function HomePage() {
  const products = useAppSelector(selectAllProducts);
  return (
    <>
      <Navbar />
      <Carousel />
      <S.ProductContainer>
        <S.ProductLists>
          {products?.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </S.ProductLists>
      </S.ProductContainer>
      <Footer />
    </>
  );
}

export default HomePage;
