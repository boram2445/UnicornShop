import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchPostCart } from "../../features/postCartSlice";
import { getToken, getLoginUserType } from "../../features/loginSlice";
import { fetchProductDetail, getDetailState } from "../../features/detailSlice";
import { openModal, selectOpenState } from "../../features/modalSlice";

import { NormalBtn } from "../../components/common/Button/Button";
import AmountBtn from "../../components/common/AmountBtn/AmountBtn";
import DetailTab from "../../components/detail/DetailTab";
import Badge from "../../components/common/Badge/Badge";
import Modal from "../../components/common/Modal/Modal";
import Spinner from "../../components/common/Spinner/Spinner";
import * as S from "./detailPageStyle";

function DetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const TOKEN = useAppSelector(getToken) || "";
  const USER_TYPE = useAppSelector(getLoginUserType);

  const { status, detail } = useAppSelector(getDetailState);
  const modal = useAppSelector(selectOpenState);

  const [selectedCount, setSelectedCount] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetail(Number(productId)));
  }, []);

  const getProductCount = (res: number) => setSelectedCount(res);

  //주문, 결제시 새로고침해도 유지되도록 세션스토리지에 저장
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
    dispatch(openModal("예"));
  };

  const putInCartModal = (
    <Modal onClickYes={() => navigate("/cart")}>
      장바구니에 등록되었습니다. <br />
      확인하시겠습니까?
    </Modal>
  );

  const needLoginModal = (
    <Modal onClickYes={() => navigate("/login")}>
      로그인이 필요한 서비스 입니다. <br /> 로그인 하시겠습니까?
    </Modal>
  );

  if (status === "loading") return <Spinner />;
  return (
    <>
      {!TOKEN && modal ? needLoginModal : null}
      {TOKEN && modal ? putInCartModal : null}
      {detail && (
        <S.DetailSection>
          <S.ProductWrap>
            <S.ImageBox image={detail.image} />
            <div>
              {/* 상품 정보 */}
              <S.InfoBox>
                <S.SellerText>{detail.store_name}</S.SellerText>
                <S.ProductText>
                  <strong>{detail.product_name}</strong>
                  {detail.stock === 0 && <Badge />}
                </S.ProductText>
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
              <S.ButtonWrap>
                <NormalBtn
                  onClick={TOKEN ? getProductNow : () => dispatch(openModal("예"))}
                  padding="18px 0"
                  disabled={USER_TYPE === "SELLER" || detail.stock === 0}
                >
                  바로 구매
                </NormalBtn>
                <NormalBtn
                  color="dark"
                  onClick={getProductCart}
                  padding="18px 0"
                  disabled={USER_TYPE === "SELLER" || detail.stock === 0}
                >
                  장바구니
                </NormalBtn>
              </S.ButtonWrap>
            </div>
          </S.ProductWrap>
          <DetailTab />
        </S.DetailSection>
      )}
    </>
  );
}

export default DetailPage;
