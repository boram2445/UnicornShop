import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchPostCart, postCartItem } from "../../features/postCartSlice";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import { NormalBtn } from "../../components/common/Button/Button";
import AmountBtn from "../../components/common/AmountBtn/AmountBtn";
import { selectProductById } from "../../features/productSlice";
import * as S from "./detailPageStyle";

function DetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const detail = useAppSelector((state) => selectProductById(state, Number(productId)));
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYnV5ZXIyIiwiZXhwIjoxNjY1OTgyNjQ4fQ.MlGGZy8nMKNX9UnxsI2K_puyPWygnIhB-aC5gQjJc4U";
  const [selectedCount, setSelectedCount] = useState(1);

  const getProductCount = (res: number) => {
    setSelectedCount(res);
  };

  const getProductNow = () => {
    console.log("바로구매");
  };

  const getProductCart = () => {
    console.log("장바구니");
    dispatch(
      fetchPostCart({ TOKEN, product_id: detail?.product_id, quantity: selectedCount, check: true })
    );
    if (confirm("장바구니에 등록되었습니다.\n확인하시겠습니까?") === true) {
      navigate("/cart");
    }
    return;
  };

  return (
    <>
      <Header />
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
                {detail.price?.toLocaleString()}
                <span>원</span>
              </S.PriceText>
            </S.InfoBox>
            {/* 상품 장바구니 담기 */}
            <S.ShiftText>
              택배배송 /{" "}
              {detail.shipping_fee === 0 ? "무료배송" : `배송비 ${detail.shipping_fee}원`}
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
                    {detail.price && (detail.price * selectedCount).toLocaleString()}
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
      <Footer />
    </>
  );
}

export default DetailPage;
