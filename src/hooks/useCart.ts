import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import {
  checkAllItem,
  checkItem,
  fetchDeleteCartItem,
  fetchGetCartList,
  reset,
  selectCheckAllState,
  selectCheckedItems,
  setTotalPrice,
} from "../reducer/cartListSlice";
import { getToken } from "../reducer/loginSlice";
import { useModal } from "./useModal";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { open, close } = useModal();

  const [cartItemId, setCartItemId] = useState(0);
  const [deleteType, setDeleteType] = useState("");
  const [onReset, setOnReset] = useState(false);

  const isAllChecked = useAppSelector(selectCheckAllState);
  const checkedItems = useAppSelector(selectCheckedItems);
  const TOKEN = useAppSelector(getToken) || "";

  useEffect(() => {
    dispatch(reset());
    setOnReset(true);
    dispatch(fetchGetCartList(TOKEN));
  }, []);

  //개별 상품 지우기 재확인 모달 열기
  function OpenDeleteModal(cart_item_id: number) {
    open("확인");
    setCartItemId(cart_item_id);
    setDeleteType("one");
  }

  //개별 상품 삭제후 모달 닫기
  function deleteCartItem() {
    dispatch(fetchDeleteCartItem({ TOKEN, cart_item_id: cartItemId }));
    close();
    setDeleteType("");
  }

  //선택상품 모두 지우기 재확인 모달 열기
  function OpenDeleteAllModal() {
    open("확인");
    setDeleteType("selected");
  }

  //선택상품 모두 지우기후 모달 닫기
  function deleteSelectItems() {
    checkedItems.forEach((item) => {
      dispatch(fetchDeleteCartItem({ TOKEN, cart_item_id: item.cart_item_id }));
    });
    close();
    setDeleteType("");
  }

  //체크 박스
  const handleCheckInput = (e: React.ChangeEvent<HTMLInputElement>, productId?: number) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      dispatch(checkAllItem({ isChecked: checked }));
    } else {
      dispatch(checkItem({ productId, isChecked: checked }));
    }
    dispatch(setTotalPrice());
  };

  //결제 페이지로 넘어가기
  const handleOrderBtn = () => {
    const orderType = !isAllChecked ? "cart_one_order" : "cart_order";
    sessionStorage.setItem(
      "order",
      JSON.stringify({ ["type"]: orderType, ["items"]: checkedItems })
    );
    navigate("/payment");
  };

  return {
    OpenDeleteModal,
    deleteCartItem,
    OpenDeleteAllModal,
    deleteSelectItems,
    handleCheckInput,
    handleOrderBtn,
    deleteType,
    checkedItems,
    onReset,
  };
};
