import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchGetCartList, fetchPostCart, getCartState } from "../../reducer/cartListSlice";
import { fetchProductDetail, getDetailState } from "../../reducer/detailSlice";
import { useModal } from "../../hooks/useModal";
import ProductDetail from "../../components/detail/ProductDetail/ProductDetail";
import ProductCount from "../../components/detail/ProductCount/ProductCount";
import DetailTab from "../../components/detail/DetailTab/DetailTab";
import { NormalBtn } from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import Spinner from "../../components/common/Spinner/Spinner";
import { useUser } from "../../hooks/useUser";
import * as S from "./detailPageStyle";

function DetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { postStatus } = useAppSelector(getCartState);
  const { status, detail } = useAppSelector(getDetailState);
  const { isOpen, open } = useModal();
  const { isLogined, userType } = useUser();

  const [selectedCount, setSelectedCount] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetail(Number(productId)));
  }, []);

  useEffect(() => {
    if (postStatus === "succeeded") {
      dispatch(fetchGetCartList());
    }
  }, [postStatus]);

  const getProductCount = (res: number) => setSelectedCount(res);
  const disableBtn = userType === "SELLER" || detail?.stock === 0;

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
      fetchPostCart({ product_id: detail?.product_id, quantity: selectedCount, check: true })
    );
    open("예");
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
      {!isLogined && isOpen ? needLoginModal : null}
      {isLogined && isOpen ? putInCartModal : null}
      {detail && (
        <S.DetailLayout>
          <S.ProductWrap>
            <S.ImageBox image={detail.image} />
            <div>
              <ProductDetail />
              <ProductCount
                getProductCount={getProductCount}
                stock={detail?.stock}
                selectedCount={selectedCount}
                price={detail?.price}
              />
              {/* 상품 구매 버튼 */}
              <S.ButtonWrap>
                <NormalBtn
                  onClick={isLogined ? getProductNow : () => open("예")}
                  padding="14px 0"
                  disabled={disableBtn}
                >
                  바로 구매
                </NormalBtn>
                <NormalBtn
                  color="dark"
                  onClick={getProductCart}
                  padding="14px 0"
                  disabled={disableBtn}
                >
                  장바구니
                </NormalBtn>
              </S.ButtonWrap>
            </div>
          </S.ProductWrap>
          <DetailTab />
        </S.DetailLayout>
      )}
    </>
  );
}

export default DetailPage;
