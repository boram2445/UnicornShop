import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectAllProducts,
  getTotalPageCount,
  fetchGetProducts,
} from "../../reducers/productSlice";
import ProductCard from "../../components/home/ProductCard/ProductCard";
import Navbar from "../../components/common/Navbar/Navbar";
import Carousel from "../../components/home/Carousel/Carousel";
import Footer from "../../components/common/Footer/Footer";
import * as S from "./homePageStyle";
import PaginationBtn from "../../components/common/PaginationBtn/PaginationBtn";

function HomePage() {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const totalPageCount = useAppSelector(getTotalPageCount);
  const getPageCount = (currentPage: number) => {
    setPage(currentPage);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchGetProducts(page));
  }, [page]);
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
      <PaginationBtn totalPage={totalPageCount} getPageCount={getPageCount} />
      <Footer />
    </>
  );
}

export default HomePage;
