import React from "react";
import * as S from "./wranBoxStyle";

function WranBox() {
  return (
    <article>
      <S.Title>* 상품 등록 주의사항</S.Title>
      <S.Content>
        <p>
          - 부적절한 상품이미지 혹은 내용이 업로드 되었을시 상품 강제 삭제 및 경고 조치를 받을 수
          있습니다.
        </p>
      </S.Content>
    </article>
  );
}

export default WranBox;
