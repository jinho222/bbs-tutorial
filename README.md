# BBS
* FE: React + Redux-thunk
* BE: Express.js + MongoDB [backend github](https://github.com/jinho222/bbs-server)
* Deploy: <https://bbs-tutorial.netlify.app>
* 로직 구현에만 집중하고자 UI는 bootstrap을 이용

## 설명
프론트엔드와 백엔드를 각각 분리해서 만든 게시판 프로젝트입니다.\
이미 만들어진(다른 사람이 만들어놓은) API를 ajax 통신은 익숙했으나, 혼자서 프론트와 백을 동시에 만들고 연동시켜본 경험은 없었습니다.\
FE와 BE 2개 모두를 직접 만들어보고 싶어, 시작한 프로젝트입니다.\
\
로그인, 회원가입, 글 CRUD, 페이지네이션, 권한에 따른 페이지 접속 차단 등 기본적인 기능들 위주로 구현이 되어있습니다.\
CORS 이슈, 백단에서 비동기 코드가 어떻게 돌아가는지, MVC패턴 등에 대해 깊이있게 이해할 수 있었습니다.\
\
당장은 필수기능 구현에만 집중했어서, 추후에 추가하고 싶은 기능들이 많습니다.\
게시판 별 분리, 검색기능, 관리자페이지, 댓글 기능, 이메일 인증 등의 기능들을 덧붙일 생각입니다.\
향후 추가되는 기능들을 고려하여 확장성 좋은 코드를 구현하고자 신경을 썼습니다.
## 문제해결
프로젝트 초기에는 cookie를 이용해 회원인증을 시도했습니다.\
그런데 cookie가 브라우저에 계속 생성되지 않아서 원인을 찾던 중, chrome cookie 정책 탓에 서로 다른 domain의 경우, SameSite 속성을 따로 주지 않으면 쿠키 전송이 이루어지지 않는다는 것을 알게 되었습니다.\
그래서 SameSite속성을 따로 주었는데도, 브라우저에 cookie가 생성되지 않아 의아함을 느꼈습니다.\
계속 인터넷을 찾아본 끝에, express-session 공식문서에서 SameSite 속성(+ Secure 속성)을 주어도, https protocol이 아니면 cookie가 생성되지 않는 것을 알게 되었습니다.\
하여 cookie로 처리하려던 부분들을 jwt token을 사용하도록 모두 변경하였습니다.\
비록 시간도 오래 걸리고, 스트레스도 많이 받았지만, 보안 관련 정책이나 jwt token 처리 방식에 대해 알 수 있었던 좋은 경험이었습니다.
## 화면
초기 화면은 다음과 같습니다.\
\
<img src="https://github.com/jinho222/images/blob/main/bbs/1.png" width="600">\
\
아래 두 사진처럼 회원가입과 로그인시 validation 체크를 해줍니다.\
\
<img src="https://github.com/jinho222/images/blob/main/bbs/2.png" width="600">\
\
<img src="https://github.com/jinho222/images/blob/main/bbs/3.png" width="600">\
\
게시판 페이지에 db에 저장된 글들을 화면에 보여줍니다.\
\
<img src="https://github.com/jinho222/images/blob/main/bbs/4.png" width="600">\
\
페이지네이션 기능도 직접 구현하였습니다.\
(사진에 작성자나 날짜가 없는 글들이 있는데, db 필드가 추가되기 이전에 만들었던 글들입니다.)\
\
<img src="https://github.com/jinho222/images/blob/main/bbs/5.png" width="600">\
\
글쓰기 버튼을 누르면 사진처럼 제목과 내용을 입력가능합니다.\
\
<img src="https://github.com/jinho222/images/blob/main/bbs/6.png" width="600">\
\
글 상세페이지는 다음과 같으며, 같은 계정으로 작성된 글들은 수정 및 삭제가 가능합니다.\
\
<img src="https://github.com/jinho222/images/blob/main/bbs/7.png" width="600">
