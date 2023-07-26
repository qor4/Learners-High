# 230724

### 기능 구현

- 작성 중인 강의 확인 API
- 작성 중인 수업 정보 불러오기 API
- 작성 중인 회차 정보 불러오기 API
- 학생 위시리스트 추가 API
- 학생 위시리스트 삭제 API

### 발생 오류

**Could not write JSON: failed to lazily initialize a collection of role**

→ Rest API 등에서 ResponseEntity<Entity> 등의 리턴 값이 존재 할 경우 Json parser에 의해서 에러가 발생할 수 있다

→ Entity를 DTO로 Controller return 값을 변경해줌


# 230725

### 기능 구현

- 학생 메인 한 주 수업 정보 조회 API
- 강사 메인 한 주 수업 정보 조회 API
- 학생 수강 신청 API

### 발생 오류

**Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Handler dispatch failed; nested exception is java.lang.StackOverflowError] with root cause****

→ @Data 어노테이션을 사용해서 무한 순환 참조가 발생한 오류

→ @Data 어노테이션을 @Getter, @Setter 어노테이션으로 변경
