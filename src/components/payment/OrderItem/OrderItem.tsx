import React from "react";
import * as S from "./orderItemStyle";

function OrderItem() {
  return (
    <S.OrederItem>
      <S.ImageBox>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhH4bzm8vsw3GJecjdahGL2GuMiHAa5o9lmcSuplc&s" />
      </S.ImageBox>
      <div>
        <S.ShopText>백엔드글로벌</S.ShopText>
        <S.ProductText>딥러닝 개발자 무릎 담요</S.ProductText>
        <S.CountText>수량 : 1개</S.CountText>
      </div>
      <S.DisCountText>-</S.DisCountText>
      <S.ShipText>무료배송</S.ShipText>
      <S.ItemPayText>17,500원</S.ItemPayText>
    </S.OrederItem>
  );
}

export default OrderItem;
