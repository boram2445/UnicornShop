import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAuthState, logout } from "../../../features/loginSlice";
import { openModal, selectOpenState } from "../../../features/modalSlice";
import ArrowModal from "../ArrowModal/ArrowModal";
import Modal from "../Modal/Modal";

import { ReactComponent as CartIcon } from "../../../assets/icons/icon-shopping-cart.svg";
import { ReactComponent as UserIcon } from "../../../assets/icons/icon-user.svg";
import { ReactComponent as BagIcon } from "../../../assets/icons/icon-shopping-bag.svg";
import * as S from "./iconNavStyle";

function IconNav() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { TOKEN, userName, userType } = useAppSelector(getAuthState);

  const userBtnRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const modal = useAppSelector(selectOpenState);
  const [onArrowModal, setArrowModal] = useState(false);

  //헤더 화살표 아이콘
  const onArrowIcon = !TOKEN ? undefined : onArrowModal ? "open" : "close";

  //모달
  const handleOnModal = (value: boolean) => setArrowModal(value);

  const needLoginModal = (
    <Modal onClickYes={() => navigate("/login")}>
      로그인이 필요한 서비스 입니다. <br /> 로그인 하시겠습니까?
    </Modal>
  );

  //로그아웃
  const onLogout = () => {
    handleOnModal(false);
    dispatch(logout());
    navigate("/");
  };

  const arrowList = [
    { label: "마이페이지", onClick: () => navigate("/mypage") },
    { label: "로그아웃", onClick: () => onLogout() },
  ];

  const userNav = (
    <>
      <S.UerModalWrap>
        <S.WideNavBtn
          type="button"
          onClick={TOKEN ? () => setArrowModal((prev) => !prev) : () => navigate("/login")}
          arrow={onArrowIcon}
          ref={userBtnRef}
        >
          <UserIcon stroke="black" />
          <small className="txt-ellipsis">{TOKEN ? userName : "로그인"}</small>
        </S.WideNavBtn>
        <ArrowModal
          isOpen={onArrowModal}
          list={arrowList}
          onModal={handleOnModal}
          btnRef={userBtnRef}
        />
      </S.UerModalWrap>
    </>
  );

  if (userType === "SELLER")
    return (
      <>
        <S.WideNavBtn onClick={() => navigate("/center")}>
          <BagIcon stroke="black" />
          <small>판매자 센터</small>
        </S.WideNavBtn>
        {userNav}
      </>
    );
  return (
    <>
      {!TOKEN && modal ? needLoginModal : null}
      <S.NavBtn onClick={TOKEN ? () => navigate("/cart") : () => dispatch(openModal("예"))}>
        <CartIcon stroke="black" />
      </S.NavBtn>
      {userNav}
    </>
  );
}

export default IconNav;
