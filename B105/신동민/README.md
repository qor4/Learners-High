# 3주차 PJT

## 0724

### 1. 오늘 한 일
- 로그인 및 회원가입 서버 연동
- 프론트엔드 폴더 구조 및 변수와 파일명 컨벤션
- API 경로 설정

### 2. 이슈 및 보완 방향
- 회원가입할 때, userNo를 받아와서 이력 및 학력 객체에 등록 필요
- 회원가입할 때, 중복 아이디 메세지가 발생하면, 그 이후에 중복되지 않은 아이디에도 메시지가 뜨는 문제 발견
- CORS Error 발생에 따라 임시로 구글 익스텐션 설치로 CORS 에러 방지
- post 요청할 때, {headers: {"Content-Type": 'application/json'}} 필요
- api 요청할 때 "/" 등 주소 오타 및 미기재로 에러 발생 잦음 -> apiPath를 통해 휴먼 에러 최소화 필요

### 3. 금주 할 일
- 리액트 캘린더를 활용한 강의 일정 생성 편리하게 만들기
- 학력 등록 코드 만들기
- 회원가입 리팩토링
- auth 관련 페이지 생성(회원가입, 로그인, 이력 등록, 학력 등록)
- user 관련 페이지 생성(마이페이지, 수업 페이지)
- WebRTC 인수인계 받기
- (시간 나면) create-react-app 대신, 'vite' 사용
- (시간 나면) typescript로 바꿔보기
- (시간 나면) Three.js 등 시각화 툴 학습
---
## 0725

### 1. 오늘 한 일 (할 일)
- 학력 넣기
- (예정) 학력에 드롭박스
- 로그인정보 쿠키 및 세션에 넣기 
- 마이페이지 - 이력 / 경력 / 이력 및 경력 수정 삭제

### 2. 이슈 및 보완 방향
- 로그인 결과 세션이 아닌 로컬 스토리지에 저장됨 -> 세션스토리지로 코드 변환했지만, 확인 필요 (공백으로 저장_백엔드 구현 이후 확인 예정)
- 세션스토리지 구현이 안됐지만 해결 (구조분해할당)
```
const persistConfig = {
  key: "root",
  storage: storageSession, // 이걸 storage로 함으로써, localStorage를 선언함 (session을 import 했음에도)
  whitelist: ["user"], // 유지하고 싶은 값을 배열로 전달
  blacklist: [], // 유지하기 싫은 값을 배열로 전달
};
```
- url로 들어왔는데, url의 파라미터와 redux 정보가 다르면 수정 등의 요청을 막아야 한다. (+ 수정이 안 보이게)
=> 아래 코드로 params 뽑기
```
import { useParams } from "react-router-dom";
const { id } = useParams();
```
- UserJoin.jsx에서 전화번호 형식 입력완료. 근데 다시 돌아올땐 이녀석이 false로 (백엔드에 맡겨야할수도? 협의 필요)
- get으로 DB에서 값을 불러왔는데, 이걸 컴포넌트마다 axios 요청으로 불러올지, redux에 담을 정보는 무엇까지인지 필요.
- listItem 컴포넌트에서 수정이 일어났는데, 이걸 반영하기 위해.. useState로 감싸기 or 해당 페이지 리다이렉트 고민
=> 질문하기(효율적인 방법? axios get으로 해당 컴포넌트만 덧씌우기..?)

### 3. 금주 할 일 (완료했으면 <완료 추가>)
- 리액트 캘린더를 활용한 강의 일정 생성 편리하게 만들기
- 학력 등록 코드 만들기
- 회원가입 리팩토링
- auth 관련 페이지 생성(회원가입, 로그인, 이력 등록, 학력 등록)
- user 관련 페이지 생성(마이페이지, 수업 페이지)
- WebRTC 인수인계 받기
- (시간 나면) create-react-app 대신, 'vite' 사용
- (시간 나면) typescript로 바꿔보기
- (시간 나면) Three.js 등 시각화 툴 학습
---
## 0726

### 1. 오늘 한 일 (할 일)
- 클래스 CRUD 인수인계
- 발표 준비

### 2. 이슈 및 보완 방향
- redux-persist로 새로고침해도 리덕스 스토어 유지하려했으나, <RTK non-serializable value> 에러 발생
-> redux는 state와 action에 직렬화 불가능한 값 전달이 불가능함
-> 액션에 toString() 메서드 전달해도 되지만, 미들웨어 설정 통해 해결

---
## 0801

### 1. 오늘 한 일 (할 일)
- 로그인, 로그아웃 완료
- 로그인할 경우, 리덕스에 필요 정보 모두 담긴 것 확인 완료
- 세션스토리지에 로그인 정보 담긴 것 확인

### 2. 이슈 및 보완 방향
- new Date()는 object라서 props로 넘길 때 불가능하거나, 값의 변경시 모든 데이터가 일괄로 바뀌는 문제 발생함
-> 모두 new Date() 처리하여, 깊은 복사 처리함
- 세션에 isLogIn만 담기는 문제 발생
- userInfo만 리덕스에 저장되길래 확인했는데, dispatch 보낼 때 userInfo만 보내게 했음.
- 404 등 지정하지 않는 경로로 갔을 때 Main으로 가는 라우터 필요
- 날짜의 상한과 하한을 filterdDate로 했는데, MinDate, MaxDate 처리하면 끝나는 문제

---
## 0802

### 1. 오늘 한 일 (할 일)
- 

### 2. 이슈 및 보완 방향
- DatePicker에서 "날짜 입력"을 해야만, 끝나는 시간이 반영됨. (이거 해결 필요)
- "날짜 입력" 버튼, "회차 등록" 버튼을 개별적으로 눌러야만 전체 데이터셋이 바뀜 -> UI 측면에서의 고민 필요 (onBlur로 처리할지 등)
- CORS-ERROR
```
Access to XMLHttpRequest at 'https://i9b105.p.ssafy.io:7777/class/join' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```
- 첫 시작일에 "입력"을 눌러야 "setDate" 에러가 발생하지 않음.
-> 해결 필요