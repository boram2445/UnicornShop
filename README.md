# 🦄 유니콘 마켓 | 누구든지 마켓 주인이 될수 있다!

```
🧡 '유니콘 마켓'은 누구든지 마켓 주인이 될 수 있는 '오픈 마켓 서비스' 입니다.

🎀 회원가입을 통해 구매자, 혹은 판매자로 계정을 생성할 수 있습니다.

⭐️ 구매자는 상품 검색, 장바구니 담기, 상품 주문 등의 기능을 사용할 수 있습니다.

✨ 판매자는 상품 등록 및 삭제 등, 판매자 대시보드로 상품 관리를 할 수 있습니다.
```

- 배포 URL : https://unicorn-market.netlify.app/

- 구매자 계정

  - ID : unicorn12
  - PW : unicorn12

- 판매자 계정

  - ID : unicorn123
  - PW : unicorn123

<div align="center">
<h1>개발 환경</h1>
</div>

### [기술]

- FrontEnd : **`React`**, **`TypeScript`**, **`styled-components`**, **`Redux-Toolkit`**

- BackEnd : 제공된 API

<br><br>

<div align="center">
<h1>구현 기능</h1>
</div>

- 🔐 인증

      - [로그인 / 로그아웃](#👍-1-로그인--로그아웃)
      - [회원가입](#👍-2-회원가입)

- 💵 구매자

      - [상품 목록 / 상품 상세](#👍-3-상품-목록-상품-상세)
      - [상품 검색](#👍-4-상품-검색)
      - [장바구니](#👍-5-장바구니---구매회원)
      - [주문/결제 / 마이페이지](#👍-6-주문--결제--마이페이지---구매회원)

- 🔖 판매자

      - [판매자 센터](#👍-7-판매자-센터---판매회원)
      - [상품 등록](#👍-8-상품-등록---판매회원)

<br/>

## 👍 1. 로그인 & 로그아웃

- 탭을 클릭하여 **구매회원, 판매회원에 따라 다른 로그인**이 가능합니다.
- 회원 종류에 따라 다른 기능을 사용할 수 있습니다. (구매자-장바구니, 주문 / 판매자 - 상품 등록, 수정, 삭제)
- 로그인이 성공적으로 이루어지면, 홈헤더에 **회원 id**를 보여줍니다.
- 회원 id 버튼을 누르면, dropdown 모달이 나타나고, 로그아웃 버튼을 눌러 **로그아웃**이 가능합니다.

|                                                     로그인                                                     |                                                    로그아웃                                                     |
| :------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/boram2445/instagram-clone/assets/68495264/34c248b0-c87b-4c13-9368-67cc1f3a08bc"/> | <img src="https://github.com/boram2445/instagram-clone/assets/68495264/aba17cd2-9d23-4d19-93b7-e7f5257c4ba7" /> |

<br/>

## 👍 2. 회원가입

- 탭을 클릭하여 구매회원, 판매회원에 따라 다른 회원가입이 가능합니다.
- 기본적으로 **아이디 중복확인** 기능이 있으며, 비밀번호, 비밀번호 일치, 휴대폰 번호를 **모두 입력해야 가입이 가능**합니다.
- 판매자는 **사업자 등록번호 중복 확인**을 해야 가입 가능합니다.

|                                               회원가입 - 구매자                                                |                                               회원가입 - 판매자                                                |
| :------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/boram2445/instagram-clone/assets/68495264/1c3c6963-ce51-4c08-b1eb-68f65329b1fb"/> | <img src="https://github.com/boram2445/instagram-clone/assets/68495264/7ab22c36-c600-4b13-bd8a-a51600e19238"/> |

<br/>

## 👍 3. 상품 목록, 상품 상세

- **홈**에서는 모든 판매자가 등록한 상품들을 살펴볼 수 있습니다.
- 상품 카드는 화면 너비에 따라 **반응형**으로 구현하였습니다.
- 상품 목록은 **페이지네이션 버튼**을 클릭하여 다음 페이지의 상품을 볼 수 있습니다.
  <br/>

- 상품을 클릭하면, **상품 상세 페이지**가 나타납니다.
- 상세 페이지에서는 구매할 개수를 선택할 수 있으며, 바로 구매, 장바구니 버튼이 있습니다.
- 판매자의 경우 구매 **버튼이 비활성화** 되어있으며, 비회원의 경우 **로그인 필요 모달**이 나타납니다. 로그인한 회원의 경우 버튼의 기능을 정상적으로 사용할 수 있습니다.

|                                              상품 목록, 상품 상세                                              |
| :------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/boram2445/instagram-clone/assets/68495264/7d413308-0be9-48dd-bde3-94647eeea032"/> |

<br/>

## 👍 4. 상품 검색

- 검색 창을 통해 **상품 이름으로 검색**이 가능합니다.
- 기본적으로 **리스트 형태**로 상품이 나타나며, **카드 형태**로도 변경 가능합니다.
- 등록일순, 낮은 가격순, 높은 가격순에 따라 **정렬**이 가능합니다.

|                                                   상품 검색                                                    |
| :------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/boram2445/instagram-clone/assets/68495264/d496ec29-c03e-4ddc-b47d-538c07dc739e"/> |

<br/>

## 👍 5. 장바구니 - 구매회원

- 제품 상세 페이지에서 '장바구니 담기' 버튼 클릭시 장바구니에 제품이 담김니다.
- 상품의 **수량수정**이 가능하며, 장바구니에 담은 **제품 개별 삭제, 전체 삭제**가 가능합니다.
- 선택 버튼을 통해 **주문할 상품을 선택**할 수 있습니다. 선택된 상품에 따라 **결제 예정 금액이 변경**됩니다.

|                                                    장바구니                                                    |
| :------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/boram2445/instagram-clone/assets/68495264/b0a4dc6b-cde0-4d99-a66c-e88aeb3f9a80"/> |

<br/>

## 👍 6. 주문 / 결제 & 마이페이지 - 구매회원

- 장바구니 페이지에서 결제할 제품 선택후 '주문하기'버튼을 클릭하면 **주문 페이지**로 넘어갑니다.
- 주문자 정보를 입력하고, 배송지 정보는 **'주문자 정보와 동일' 버튼**을 클릭하여 간편하게 작성할 수 있습니다.
- 배송 주소는 **Daum Postcode** 서비스를 이용해서 간편하게 입력할 수 있도록 하였습니다.
- 주문이 완료되면, **마이페이지**에서 결제 내역을 확인 가능합니다.

|                                                  주문 / 결제                                                   |
| :------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/boram2445/instagram-clone/assets/68495264/3c4255bb-142c-4a35-bed8-9e3f8421bdf8"/> |

|                                                        마이페이지                                                        |
| :----------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/boram2445/UnicornShop/assets/68495264/ef77b58d-981a-445b-b773-5d2e33643f03" width="600px"/> |

<br/>

## 👍 7. 판매자 센터 - 판매회원

- 판매회원의 경우, 판매자 센터에서 지금까지 **등록한 상품을 확인**할 수 있습니다.
- 상품 등록 버튼을 눌러 **상품 등록**이 가능하며, **상품 수정** 및 **상품 삭제**가 가능합니다.

|                                                  판매자 센터                                                   |
| :------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/boram2445/instagram-clone/assets/68495264/491762e8-ae5c-4419-b509-6d0eb4a1f2d0"/> |

<br/>

## 👍 8. 상품 등록 - 판매회원

- 판매회원의 경우, 판매자 센터에서 **상품 등록**을 할 수 있습니다.
- 상품이미지, 상품명, 판매가, 배송방법, 배송비, 재고, 상품 상세 정보를 등록 가능합니다.
- 모두 작성후 '저장하기' 버튼을 누르면 판매자 센터로 돌아가 등록된 상품을 확인 할 수 있습니다.

|                                                   상품 등록                                                    |
| :------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/boram2445/instagram-clone/assets/68495264/e3a00370-41b8-4e54-b533-2cac626c40d8"/> |
