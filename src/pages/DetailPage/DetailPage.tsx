import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchPostCart } from "../../features/postCartSlice";
import { NormalBtn } from "../../components/common/Button/Button";
import AmountBtn from "../../components/common/AmountBtn/AmountBtn";
import { selectProductById } from "../../features/productSlice";
import * as S from "./detailPageStyle";
import { getToken } from "../../features/authSlice";
import DetailTab from "../../components/detail/DetailTab";

function DetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const detail = useAppSelector((state) => selectProductById(state, Number(productId)));
  const TOKEN = useAppSelector(getToken) || "";
  const [selectedCount, setSelectedCount] = useState(1);

  const getProductCount = (res: number) => {
    setSelectedCount(res);
  };

  const getProductNow = () => {
    sessionStorage.setItem(
      "order",
      JSON.stringify({
        ["type"]: "direct_order",
        ["items"]: [{ ["quantity"]: selectedCount, ["item"]: { ...detail } }],
      })
    );
    navigate("/payment");
  };

  const getProductCart = () => {
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
      {detail && (
        <S.ProductSection>
          <S.ImageBox>
            <img src={detail.image} alt="상품 이미지" />
          </S.ImageBox>
          <S.CartBox>
            {/* 상품 정보 */}
            <S.InfoBox>
              <S.SellerText>{detail.store_name}</S.SellerText>
              <S.ProductText>{detail.product_name}</S.ProductText>
              <S.PriceText>
                {detail.price?.toLocaleString()}
                <span>원</span>
              </S.PriceText>
            </S.InfoBox>
            {/* 상품 장바구니 담기 */}
            <S.DetailWrap>
              <div>
                <S.DetailText>
                  {detail.shipping_method === "PARCEL" ? "직접배송" : "택배배송"} /{" "}
                  {detail.shipping_fee === 0
                    ? "무료배송"
                    : `배송비 ${detail.shipping_fee.toLocaleString()} 원`}
                </S.DetailText>
                <S.StockText>* 재고 : {detail.stock} 개</S.StockText>
              </div>
            </S.DetailWrap>
            {/* 상품 개수 버튼 */}
            <AmountBtn getCount={getProductCount} stock={detail.stock} />
            <S.PriceBox>
              <S.CountWrapBox>
                <S.PriceDescribeText>총 상품 금액</S.PriceDescribeText>
                <S.CountBox>
                  <S.CountText>
                    총 수량 <span>{selectedCount}</span>개
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
              <NormalBtn onClick={getProductNow} width="416px" padding="18px 0">
                바로 구매
              </NormalBtn>
              <NormalBtn color="dark" onClick={getProductCart} width="200px" padding="18px 0">
                장바구니
              </NormalBtn>
            </S.ButtonBox>
          </S.CartBox>
          <DetailTab />
        </S.ProductSection>
      )}
    </>
  );
}

export default DetailPage;
