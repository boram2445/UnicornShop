import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { getSearchState } from "../../reducer/searchSlice";
import SortNavbar from "../../components/search/sortNavbar/SortNavbar";
import ProductCard from "../../components/home/ProductCard/ProductCard";
import ProductListCard from "../../components/search/productListCard/ProductListCard";
import Spinner from "../../components/common/Spinner/Spinner";
import * as S from "./searchPageStyle";

function SearchPage() {
  const { keyword } = useParams();
  const { status, products, postType } = useAppSelector(getSearchState);

  if (status === "loading") return <Spinner />;

  let content;
  if (products.length === 0) {
    content = (
      <S.DescriptionBox>
        <strong>
          입력하신 <span>&lsquo;{keyword}&rsquo;</span> 에 대한 스토어 내 검색결과가 없습니다.
        </strong>
        <ul>
          <li>-일시적으로 상품이 품절되었을 수 있습니다.</li>
          <li>-단어의 철자가 정확한지 확인해 주세요.</li>
          <li>-보다 일반적인 검색어로 다시 검색해보세요.</li>
          <li>-검색어의 띄어쓰기를 다르게 해보세요(예:리바이스청바지 &#62; 리바이스 청바지)</li>
        </ul>
      </S.DescriptionBox>
    );
  } else if (postType === "album") {
    content = (
      <S.ProductLists>
        {products?.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </S.ProductLists>
    );
  } else {
    content = (
      <ul>
        {products?.map((product) => (
          <ProductListCard key={product.product_id} product={product} />
        ))}
      </ul>
    );
  }

  return (
    <S.Container>
      <S.Title>
        <span>&lsquo;{keyword}&rsquo;</span> 에 대한 검색 결과입니다.
      </S.Title>
      <SortNavbar />
      {content}
    </S.Container>
  );
}

export default SearchPage;
