import { useAppDispatch, useAppSelector } from "../hooks";
import { closeModal, openModal, selectOpenState } from "../reducer/modalSlice";

export const useModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectOpenState);
  const open = (type: "예" | "확인") => dispatch(openModal(type));
  const close = () => dispatch(closeModal());

  return { open, close, isOpen };
};
