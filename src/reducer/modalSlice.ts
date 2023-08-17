import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

type ModalSlice = {
  open: boolean;
  btnText: {
    yes: "예" | "확인";
    no: "아니오" | "취소";
  };
};

const initialState: ModalSlice = {
  open: false,
  btnText: {
    yes: "예",
    no: "아니오",
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    reset: () => initialState,
    openModal: (state, action) => {
      state.open = true;
      const BtnType = action.payload;
      if (BtnType === "확인") {
        state.btnText.no = "취소";
        state.btnText.yes = "확인";
      }
    },
    closeModal: (state) => {
      state.open = false;
      state.btnText.no = "아니오";
      state.btnText.yes = "예";
    },
  },
});

export const selectOpenState = (state: RootState) => state.modal.open;
export const selectBtnText = (state: RootState) => state.modal.btnText;
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
