import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { axiosGetDetail, getDetailStatus, selectDetail } from "../../reducers/getDetailSlice";
import Footer from "../../components/common/Footer/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import { NormalBtn } from "../../components/common/Button/Button";
import AmountBtn from "../../components/common/AmountBtn/AmountBtn";
import * as S from "./productDetailPageStyle";

function ProductDetailPage() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  // const status = useAppSelector(getDetailStatus);
  const detail = useAppSelector(selectDetail);
  useEffect(() => {
    // if (status === "idle") {
    //   dispatch(axiosGetDetail(productId));
    // }
    dispatch(axiosGetDetail(productId));
  }, [productId]);
  return (
    <>
      <Navbar />
      {detail && (
        <S.ProductSection>
          <S.ImageBox>
            <img src={detail.image} alt="상품 이미지" />
          </S.ImageBox>
          <S.CartBox>
            {/* 상품 정보 */}
            <S.InfoBox>
              <S.SellerText>{detail.seller_store}</S.SellerText>
              <S.ProductText>{detail.product_name}</S.ProductText>
              <S.PriceText>
                {detail.price}
                <span>원</span>
              </S.PriceText>
            </S.InfoBox>
            {/* 상품 장바구니 담기 */}
            <S.ShiftText>
              택배배송 /{" "}
              {detail.shipping_fee === 0 ? "무료배송" : `배송비 ${detail.shipping_fee}원`}
            </S.ShiftText>
            <AmountBtn />
            <S.PriceBox>
              <S.CountWrapBox>
                <S.PriceDescribeText>총 상품 금액</S.PriceDescribeText>
                <S.CountBox>
                  <S.CountText>
                    총 수량<span>1</span>개
                  </S.CountText>
                  <S.PriceResultText>
                    17,500<span>원</span>
                  </S.PriceResultText>
                </S.CountBox>
              </S.CountWrapBox>
            </S.PriceBox>
            {/* 상품 구매 버튼 */}
            <S.ButtonBox>
              <NormalBtn size="medium">바로 구매</NormalBtn>
              <NormalBtn size="smedium" color="dark">
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

export default ProductDetailPage;
