import React from "react";
import { Link } from "react-router-dom";
import {
  FooterLayout,
  ContentBox,
  TopWrap,
  PolicyList,
  SnsBtnList,
  BottomWrap,
} from "./footerStyle";
import InstaIcon from "../../../assets/icons/icon-insta.svg";
import FacebookIcon from "../../../assets/icons/icon-fb.svg";
import YoutubeIcon from "../../../assets/icons/icon-yt.svg";

function Footer() {
  return (
    <FooterLayout>
      <ContentBox>
        <TopWrap>
          <PolicyList>
            <li>
              <Link to="#">유니콘샵 소개</Link>
            </li>
            <li>
              <Link to="#">이용약관</Link>
            </li>
            <li>
              <Link to="#">
                <strong>개인정보처리방침</strong>
              </Link>
            </li>
            <li>
              <Link to="#">전자금융거래약관</Link>
            </li>
            <li>
              <Link to="#">청소년보호정책</Link>
            </li>
            <li>
              <Link to="#">제휴문의</Link>
            </li>
          </PolicyList>
          <SnsBtnList>
            <li>
              <Link to="#">
                <img src={InstaIcon} alt="인스타 바로가기" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src={FacebookIcon} alt="페이스북 바로가기" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src={YoutubeIcon} alt="유튜브 바로가기" />
              </Link>
            </li>
          </SnsBtnList>
        </TopWrap>
        <BottomWrap>
          <p>(주) UNICORN SHOP</p>
          <address>제주특별자치도 무지개시 유니콘로 777-77</address>
          <dl>
            <dt>사업자등록번호</dt>
            <dd>000-00-00000</dd>
            <dd>통신판매업</dd>
          </dl>
          <dl>
            <dt>대표</dt>
            <dd>김보람</dd>
          </dl>
        </BottomWrap>
      </ContentBox>
    </FooterLayout>
  );
}

export default Footer;
