import React, { useRef, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAuthState, logout } from "../../../features/loginSlice";
import { reset } from "../../../features/cartListSlice";
import { openModal, selectOpenState } from "../../../features/modalSlice";
import ArrowModal from "../ArrowModal/ArrowModal";
import Modal from "../Modal/Modal";

import { ReactComponent as CartIcon } from "../../../assets/icons/icon-shopping-cart.svg";
import { ReactComponent as UserIcon } from "../../../assets/icons/icon-user.svg";
import { ReactComponent as BagIcon } from "../../../assets/icons/icon-shopping-bag.svg";
import * as S from "./iconNavStyle";

function IconNav({ cartQuantity }: { cartQuantity: number }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const modal = useAppSelector(selectOpenState);
  const { TOKEN, userName, userType } = useAppSelector(getAuthState);

  const [onArrowModal, setArrowModal] = useState(false);
  const userBtnRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const clickCartIcon = TOKEN ? () => navigate("/cart") : () => dispatch(openModal("예"));
  const clickUserIcon = TOKEN ? () => setArrowModal((prev) => !prev) : () => navigate("/login");
  const onArrowIcon = !TOKEN ? undefined : onArrowModal ? "open" : "close"; //헤더 화살표 아이콘

  //arrowModal
  const handleArrowModal = (value: boolean) => setArrowModal(value);
  const arrowList = [
    { label: "마이페이지", onClick: () => navigate("/mypage") },
    { label: "로그아웃", onClick: () => onLogout() },
  ];

  //로그인 필요 모달
  const needLoginModal = (
    <Modal onClickYes={() => navigate("/login")}>
      로그인이 필요한 서비스 입니다. <br /> 로그인 하시겠습니까?
    </Modal>
  );

  //로그아웃
  const onLogout = () => {
    dispatch(logout());
    handleArrowModal(false);
    userType === "BUYER" && dispatch(reset());
    navigate("/");
  };

  const userNav = (
    <>
      <S.UerModalWrap>
        <S.WideNavBtn type="button" onClick={clickUserIcon} arrow={onArrowIcon} ref={userBtnRef}>
          <UserIcon stroke="black" />
          <small className="txt-ellipsis">{TOKEN ? userName : "로그인"}</small>
        </S.WideNavBtn>
        {onArrowModal && (
          <ArrowModal
            isOpen={onArrowModal}
            list={arrowList}
            onModal={handleArrowModal}
            btnRef={userBtnRef}
          />
        )}
      </S.UerModalWrap>
    </>
  );

  if (userType === "SELLER")
    return (
      <>
        {!pathname.includes("center") && (
          <S.WideNavBtn onClick={() => navigate("/center")}>
            <BagIcon stroke="black" />
            <small>판매자 센터</small>
          </S.WideNavBtn>
        )}
        {userNav}
      </>
    );
  return (
    <>
      {!TOKEN && modal ? needLoginModal : null}
      <S.NavBtn quantity={cartQuantity} onClick={clickCartIcon}>
        <CartIcon stroke="black" />
      </S.NavBtn>
      {userNav}
    </>
  );
}

export default IconNav;
