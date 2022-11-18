import { RootState } from "../app/store";
import { createSlice } from "@reduxjs/toolkit";

interface ModalProps {
  open: boolean;
  content: string;
  btnText: {
    yes: string;
    no: string;
  };
}

const initialState: ModalProps = {
  open: false,
  content: "",
  btnText: {
    yes: "예",
    no: "아니오",
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      const BtnType = action.payload;
      if (BtnType === "예") {
        state.btnText.no = "아니오";
        state.btnText.yes = "예";
      } else if (BtnType === "확인") {
        state.btnText.no = "취소";
        state.btnText.yes = "확인";
      }
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
});

export const selectOpenState = (state: RootState) => state.modal.open;
export const selectBtnText = (state: RootState) => state.modal.btnText;
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
