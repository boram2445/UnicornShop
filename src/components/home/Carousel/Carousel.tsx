import React, { useEffect, useState } from "react";
import { carouselData } from "./carouselData";
import { Link } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../../../assets/icons/icon-arrow-left.svg";
import { ReactComponent as RightArrow } from "../../../assets/icons/icon-arrow-right.svg";
import * as S from "./carouselStyle";

function Carousel() {
  const [carouselIndex, setCarouselIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      moveNextImg();
    }, 7000);

    return () => {
      clearInterval(timer);
    };
  }, [carouselIndex]);

  const moveNextImg = () => {
    if (carouselIndex !== carouselData.length) {
      setCarouselIndex(carouselIndex + 1);
    } else {
      setCarouselIndex(1);
    }
  };

  const movePrevImg = () => {
    if (carouselIndex === 1) {
      setCarouselIndex(carouselData.length);
    } else {
      setCarouselIndex(carouselIndex - 1);
    }
  };

  const moveDot = (index: number) => {
    setCarouselIndex(index);
  };
  return (
    <S.CarouselLayout>
      {carouselData.map((item, index) => {
        return (
          <Link to="#" key={item.id}>
            <S.ImgBox opacity={carouselIndex === index + 1 ? "active" : "none"}>
              <img src={process.env.PUBLIC_URL + `/Imgs/CarouselSample/image${index + 1}.png`} />
            </S.ImgBox>
          </Link>
        );
      })}
      {/* 캐러셀 화살표 이동 버튼 */}
      <S.ArrowBtn type="button" direct="left" onClick={movePrevImg}>
        <LeftArrow stroke="black" />
      </S.ArrowBtn>
      <S.ArrowBtn type="button" direct="right" onClick={moveNextImg}>
        <RightArrow stroke="black" />
      </S.ArrowBtn>
      {/* 캐러셀 닷 버튼 */}
      <S.DotBox>
        {Array.from({ length: carouselData.length }).map((_, index) => {
          return (
            <S.DotBtn
              key={index}
              isActive={carouselIndex === index + 1 ? "active" : ""}
              onClick={() => moveDot(index + 1)}
            />
          );
        })}
      </S.DotBox>
    </S.CarouselLayout>
  );
}

export default Carousel;
