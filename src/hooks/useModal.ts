import { useAppDispatch, useAppSelector } from "../hooks";
import { closeModal, openModal, selectOpenState } from "../reducer/modalSlice";

export const useModal = () => {
  const isOpen = useAppSelector(selectOpenState);
  const dispatch = useAppDispatch();
  const open = () => dispatch(openModal("확인"));
  const close = () => dispatch(closeModal());

  return { open, close, isOpen };
};
