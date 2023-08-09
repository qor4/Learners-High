# 폴더 구조

## components: 컴포넌트
- class : 수업 관련 컴포넌트
- auth : 회원가입, 로그인, 로그아웃 등 회원 인증 관련
- user : 마이페이지 등 유저 개인 정보
- room : 학습 룸 등의 WebRTC 관련
- common : header, footer 등 전체 페이지에서 사용할 컴포넌트
- report : 분석 서비스

## pages: 페이지
- 컴포넌트와 동일한 폴더 구조
- 렌더링되는 페이지 형태

## store
- 리덕스
- 전역에서 사용할 데이터 저장소 (userNo, Tocken 등)

## assets
- 배너, 로고 등의 프론트엔드 전용 사진

## api
- API 요청을 위한 주소

## hooks
- axios hook 등 각종 custom hook 저장
- 개별 컴포넌트가 아닌, 복수의 컴포넌트에서 사용할 컴포넌트의 경우 Custom Hook 예정