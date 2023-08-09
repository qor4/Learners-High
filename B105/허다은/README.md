# 230724

### 개발

- 작성 중인 강의 확인 API 개발
- 작성 중인 수업 정보 불러오기 API 개발
- 작성 중인 회차 정보 불러오기 API 개발
- 학생 위시리스트 추가 API 개발
- 학생 위시리스트 삭제 API 개발

### 발생 오류

**Could not write JSON: failed to lazily initialize a collection of role**

→ Rest API 등에서 ResponseEntity<Entity> 등의 리턴 값이 존재 할 경우 Json parser에 의해서 에러가 발생할 수 있다

→ Entity를 DTO로 Controller return 값을 변경해줌

# 230725

### 개발

- 학생 메인 한 주 수업 정보 조회 API 개발
- 강사 메인 한 주 수업 정보 조회 API 개발
- 학생 수강 신청 API 개발

### 발생 오류

****Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Handler dispatch failed; nested exception is java.lang.StackOverflowError] with root cause****

→ @Data 어노테이션을 사용해서 무한 순환 참조가 발생한 오류

→ @Data 어노테이션을 @Getter, @Setter 어노테이션으로 변경

# 230726

### 개발

- 수업 분류 조회 API 개발
- 수업 상세 정보 조회 API 개발

### 기타

- 피그마 UI 수정
- 과제 공지 ERD 생성

# 230727

### 개발

- 강사 수업 목록 조회 API 개발

### 기타

- 발표 자료 제작

# 230728

### 기타

- MongoDB 설치
- MongoDB 환경 설정

# 230731

### 개발

- 실시간 강의룸 생성 시 출석 데이터 생성 API 개발
- 실시간 수업 입장 시 출석 처리 API 개발
- 강사 과제 공지 생성 및 과제 데이터 생성 API 개발

### 발생 오류

# 230801

### 개발

- 강사 수업 관리 학생 탭 정보 조회 API 개발
- 강사 수업 관리 소개 탭 정보 조회 API 개발
- 강사 수업 관리 과제 탭 정보 조회 API 개발
- 수업 회차 개설 시 수업 총 회차 업데이트 API 수정
- 수강 신청 예외 처리 및 수강 학생 수 증가 API 수정

### 발생 오류

[**MySQL] Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column. To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.**

⇒ 하나의 레코드만을 update, delete하도록 설정되어 있는데, 다수의 레코드를 update나 delete하는 sql명령어가 실행되기 때문에 발생을 하는 것

⇒ Workbench Preferences에서 안전모드(Safe mode)를 해제하고 다시 workbench를 시작

# 230802

### 개발

- 학생 수업 관리 현황 탭 정보 조회 API 개발
- 강사 프로필 정보 조회 API 개발
- 수업 데이터베이스 이름 CLASS에서 LESSON으로 변경
- 강사 수업 관리 학생/과제 탭 DTO 변경, API 수정

### 발생 오류

**Exception.getMessage()의 값이 null**

⇒ null 객체의 값을 사용하려고 해서 발생한 오류

⇒ 해당 부분의 예외 처리를 통해 null 값을 사용하지 않도록 함
