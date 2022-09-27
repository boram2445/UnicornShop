import React from "react";
import { NormalBtn } from "../../common/Button/Button";
import * as S from "./deliveryInfoStyle";

function DeliveryInfo() {
  return (
    <section>
      <S.Title>배송정보</S.Title>
      <form>
        <table>
          <S.Catption>주문자 정보</S.Catption>
          <tbody>
            <S.Row>
              <S.LabelText>이름</S.LabelText>
              <td>
                <S.Input type="text" />
              </td>
            </S.Row>
            <S.Row>
              <S.LabelText>휴대폰</S.LabelText>
              <td>
                <S.Input type="text" size={3} width="80px" />
                &nbsp; - &nbsp;
                <S.Input type="text" size={4} width="100px" />
                &nbsp; - &nbsp;
                <S.Input type="text" size={4} width="100px" />
              </td>
            </S.Row>
            <S.Row>
              <S.LabelText>이메일</S.LabelText>
              <td>
                <S.Input type="text" />
              </td>
            </S.Row>
          </tbody>
        </table>
        <table>
          <S.Catption>배송지 정보</S.Catption>
          <tbody>
            <S.Row>
              <S.LabelText>수령인</S.LabelText>
              <td>
                <S.Input type="text" />
              </td>
            </S.Row>
            <S.Row>
              <S.LabelText>휴대폰</S.LabelText>
              <td>
                <S.Input type="text" size={3} width="80px" />
                &nbsp; - &nbsp;
                <S.Input type="text" size={4} width="100px" />
                &nbsp; - &nbsp;
                <S.Input type="text" size={4} width="100px" />
              </td>
            </S.Row>
            <S.Row>
              <S.LabelText>배송주소</S.LabelText>
              <td rowSpan={3}>
                <S.Input type="text" size={5} />
                <S.BtnWrapper>
                  <NormalBtn size="small" disabled={true}>
                    우편번호 조회
                  </NormalBtn>
                </S.BtnWrapper>
                <br />
                <S.Input type="text" width="800px" />
                <br />
                <S.Input type="text" width="800px" />
              </td>
            </S.Row>
            <S.Row>
              <S.LabelText>배송 메세지</S.LabelText>
              <td>
                <S.Input type="text" width="800px" />
              </td>
            </S.Row>
          </tbody>
        </table>
      </form>
    </section>
  );
}

export default DeliveryInfo;
