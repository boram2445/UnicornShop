import React, { useState } from "react";
import { CarouselLayout, ImgBox, ArrowBtn, DotBox, DotBtn } from "./carouselStyle";
import { carouselData } from "./carouselData";
import leftArrow from "../../assets/icon-swiper-1.svg";
import rightArrow from "../../assets/icon-swiper-2.svg";

function Carousel() {
  const [carouselIndex, setCarouselIndex] = useState(1);
  // 화살표 버튼 이후 이미지
  const moveNextImg = () => {
    if (carouselIndex !== carouselData.length) {
      setCarouselIndex(carouselIndex + 1);
    } else {
      setCarouselIndex(1);
    }
  };
  // 화살표 버튼 이전 이미지
  const movePrevImg = () => {
    if (carouselIndex === 1) {
      setCarouselIndex(carouselData.length);
    } else {
      setCarouselIndex(carouselIndex - 1);
    }
  };
  // 닷 버튼 이동
  const moveDot = (index: number) => {
    setCarouselIndex(index);
  };
  return (
    <CarouselLayout>
      {carouselData.map((item, index) => {
        return (
          <ImgBox key={item.id} opacity={carouselIndex === index + 1 ? "active" : "none"}>
            <img src={process.env.PUBLIC_URL + `/Imgs/CarouselSample/image${index + 1}.jpg`} />
          </ImgBox>
        );
      })}
      {/* 캐러셀 화살표 이동 버튼 */}
      <ArrowBtn type="button" direct="left" onClick={movePrevImg}>
        <img src={leftArrow} />
      </ArrowBtn>
      <ArrowBtn type="button" direct="right" onClick={moveNextImg}>
        <img src={rightArrow} />
      </ArrowBtn>
      {/* 캐러셀 닷 버튼 */}
      <DotBox>
        {Array.from({ length: carouselData.length }).map((item, index) => {
          return (
            <DotBtn
              key={index}
              isActive={carouselIndex === index + 1 ? "active" : ""}
              onClick={() => moveDot(index + 1)}
            />
          );
        })}
      </DotBox>
    </CarouselLayout>
  );
}

export default Carousel;
