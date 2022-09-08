import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { axiosGetDetail, getDetailStatus, selectDetail } from "../../reducers/getDetailSlice";
import Footer from "../../components/common/Footer/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import {
  ProductSection,
  ImageBox,
  CartBox,
  InfoBox,
  SellerText,
  ProductText,
  PriceText,
  ShiftText,
  ButtonBox,
  TabSection,
  PriceBox,
  PriceDescribeText,
  CountWrapBox,
  CountText,
  PriceResultText,
  CountBox,
} from "./productDetailPageStyle";
import Button from "../../components/common/Button/Button";
import AmountBtn from "../../components/common/AmountBtn/AmountBtn";

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
        <ProductSection>
          <ImageBox>
            <img src={detail.image} alt="상품 이미지" />
          </ImageBox>
          <CartBox>
            {/* 상품 정보 */}
            <InfoBox>
              <SellerText>{detail.seller_store}</SellerText>
              <ProductText>{detail.product_name}</ProductText>
              <PriceText>
                {detail.price}
                <span>원</span>
              </PriceText>
            </InfoBox>
            {/* 상품 장바구니 담기 */}
            <ShiftText>
              택배배송 /{" "}
              {detail.shipping_fee === 0 ? "무료배송" : `배송비 ${detail.shipping_fee}원`}
            </ShiftText>
            <AmountBtn />
            <PriceBox>
              <CountWrapBox>
                <PriceDescribeText>총 상품 금액</PriceDescribeText>
                <CountBox>
                  <CountText>
                    총 수량<span>1</span>개
                  </CountText>
                  <PriceResultText>
                    17,500<span>원</span>
                  </PriceResultText>
                </CountBox>
              </CountWrapBox>
            </PriceBox>
            {/* 상품 구매 버튼 */}
            <ButtonBox>
              <Button type="medium" text="바로 구매" />
              <Button type="ms" color="dark" text="장바구니"></Button>
            </ButtonBox>
          </CartBox>
        </ProductSection>
      )}

      {/* 상품 상세 보기 */}
      <TabSection>
        <Button type="tabAcity" text="제품 상세" />
        <Button type="tabAcity" text="리뷰" state="disabled" />
        <Button type="tabAcity" text="Q&A" state="disabled" />
        <Button type="tabAcity" text="반품/교환정보" state="disabled" />
      </TabSection>
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
