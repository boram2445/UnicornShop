import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  reset,
  axiosGetDetail,
  getDetailStatus,
  selectDetail,
} from "../../reducers/getDetailSlice";
import { axiosPostCart, postCartItem } from "../../reducers/postCartSlice";
import Footer from "../../components/common/Footer/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import { NormalBtn } from "../../components/common/Button/Button";
import AmountBtn from "../../components/common/AmountBtn/AmountBtn";
import * as S from "./detailPageStyle";

function DetailPage() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const status = useAppSelector(getDetailStatus);
  const detail = useAppSelector(selectDetail);
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYnV5ZXIxIiwiZXhwIjoxNjYzOTE3MzU4fQ.eULwTjycmcIrbyWV4iokrHwKiX4ghxFMbi7OdQENo-s";
  const { image, store_name, product_id, product_name, shipping_fee, price } = detail;
  const [selectedCount, setSelectedCount] = useState(1);
  useEffect(() => {
    dispatch(reset());
    dispatch(axiosGetDetail(Number(productId)));
  }, []);
  console.log(detail);
  const getProductCount = (res: number) => {
    setSelectedCount(res);
  };
  const getProductNow = () => {
    console.log("바로구매");
  };

  const getProductCart = () => {
    console.log("장바구니");
    if (confirm("장바구니에 등록되었습니다.\n확인하시겠습니까?") === true) {
      console.log("장바구니로 이동");
      dispatch(axiosPostCart({ TOKEN, product_id, quantity: selectedCount, check: true }));
    } else {
      return;
    }
  };

  return (
    <>
      <Navbar />
      {detail && (
        <S.ProductSection>
          <S.ImageBox>
            <img src={image} alt="상품 이미지" />
          </S.ImageBox>
          <S.CartBox>
            {/* 상품 정보 */}
            <S.InfoBox>
              <S.SellerText>{store_name}</S.SellerText>
              <S.ProductText>{product_name}</S.ProductText>
              <S.PriceText>
                {price?.toLocaleString()}
                <span>원</span>
              </S.PriceText>
            </S.InfoBox>
            {/* 상품 장바구니 담기 */}
            <S.ShiftText>
              택배배송 / {shipping_fee === 0 ? "무료배송" : `배송비 ${shipping_fee}원`}
            </S.ShiftText>
            {/* 상품 개수 버튼 */}
            <AmountBtn getCount={getProductCount} />
            <S.PriceBox>
              <S.CountWrapBox>
                <S.PriceDescribeText>총 상품 금액</S.PriceDescribeText>
                <S.CountBox>
                  <S.CountText>
                    총 수량<span>{selectedCount}</span>개
                  </S.CountText>
                  <S.PriceResultText>
                    {price && (price * selectedCount).toLocaleString()}
                    <span>원</span>
                  </S.PriceResultText>
                </S.CountBox>
              </S.CountWrapBox>
            </S.PriceBox>
            {/* 상품 구매 버튼 */}
            <S.ButtonBox>
              <NormalBtn size="medium" onClick={getProductNow}>
                바로 구매
              </NormalBtn>
              <NormalBtn size="smedium" color="dark" onClick={getProductCart}>
                장바구니
              </NormalBtn>
            </S.ButtonBox>
          </S.CartBox>
        </S.ProductSection>
      )}

      {/* 상품 상세 보기 */}
      <S.TabSection>
        <NormalBtn tab={true}>제품 상세</NormalBtn>
        <NormalBtn disabled={true} tab={true}>
          리뷰
        </NormalBtn>
        <NormalBtn disabled={true} tab={true}>
          Q&A
        </NormalBtn>
        <NormalBtn disabled={true} tab={true}>
          반품/교환정보
        </NormalBtn>
      </S.TabSection>
      {/* {detail && (
        <div>
          <p>{detail.seller_store}</p>
          {detail.shipping_method === "DELIVERY" && <p>택배배송</p>}
          <ProductName>{detail.product_name}</ProductName>
        </div>
      )} */}

      <Footer />
    </>
  );
}

export default DetailPage;
