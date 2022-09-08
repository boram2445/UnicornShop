import React, { useEffect } from "react";
import { ProductLists, ProductContainer } from "./homePageStyle";
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
      <ProductContainer>
        <ProductLists>
          {products &&
            products.map((product, index) => {
              return (
                <li key={index}>
                  <ProductCard product={product} />
                </li>
              );
            })}
        </ProductLists>
      </ProductContainer>
      <Footer />
    </>
  );
}

export default HomePage;
