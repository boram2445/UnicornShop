import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchGetProducts, getProductState } from "../../features/productSlice";
import ProductCard from "../../components/home/ProductCard/ProductCard";
import Carousel from "../../components/home/Carousel/Carousel";
import PaginationBtn from "../../components/common/PaginationBtn/PaginationBtn";
import Spinner from "../../components/common/Spinner/Spinner";
import * as S from "./homePageStyle";

function HomePage() {
  const dispatch = useAppDispatch();

  const { status, products, totalPage } = useAppSelector(getProductState);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchGetProducts(page));
    window.scrollTo(0, 0);
  }, [page]);

  const getPageCount = (currentPage: number) => {
    setPage(currentPage);
  };

  let content;
  if (status === "loading") content = <Spinner />;
  else {
    content = (
      <S.ProductLists>
        {products?.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </S.ProductLists>
    );
  }
  return (
    <main>
      <Carousel />
      <S.ProductSection>
        {content}
        <PaginationBtn totalPage={totalPage} getPageCount={getPageCount} />
      </S.ProductSection>
    </main>
  );
}

export default HomePage;
