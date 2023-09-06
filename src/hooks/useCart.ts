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

  useEffect(() => {
    dispatch(reset());
    setOnReset(true);
    dispatch(fetchGetCartList());
  }, []);

  const openDeleteModal = (cart_item_id: number) => {
    open("확인");
    setCartItemId(cart_item_id);
    setDeleteType("one");
  };

  const deleteCartItem = () => {
    dispatch(fetchDeleteCartItem({ cart_item_id: cartItemId }));
    close();
    setDeleteType("");
  };

  const openDeleteAllModal = () => {
    open("확인");
    setDeleteType("selected");
  };

  const deleteSelectItems = () => {
    checkedItems.forEach((item) => {
      dispatch(fetchDeleteCartItem({ cart_item_id: item.cart_item_id }));
    });
    close();
    setDeleteType("");
  };

  const handleCheckInput = (e: React.ChangeEvent<HTMLInputElement>, productId?: number) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      dispatch(checkAllItem({ isChecked: checked }));
    } else {
      dispatch(checkItem({ productId, isChecked: checked }));
    }
    dispatch(setTotalPrice());
  };

  const handleOrderBtn = () => {
    const orderType = !isAllChecked ? "cart_one_order" : "cart_order";
    sessionStorage.setItem(
      "order",
      JSON.stringify({ ["type"]: orderType, ["items"]: checkedItems })
    );
    navigate("/payment");
  };

  return {
    openDeleteModal,
    deleteCartItem,
    openDeleteAllModal,
    deleteSelectItems,
    handleCheckInput,
    handleOrderBtn,
    deleteType,
    checkedItems,
    onReset,
  };
};
