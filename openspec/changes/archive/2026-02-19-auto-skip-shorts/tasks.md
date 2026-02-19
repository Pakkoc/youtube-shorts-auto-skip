## 1. Chrome 확장 프로그램 기본 구조

- [x] 1.1 manifest.json 생성 (Manifest V3, content script 설정, youtube.com/shorts/* 매칭)

## 2. Content Script 핵심 로직

- [x] 2.1 content.js 생성 - video 요소 감지 (MutationObserver 활용)
- [x] 2.2 video ended 이벤트 리스너 등록
- [x] 2.3 영상 종료 시 자동 스크롤로 다음 Shorts 이동

## 3. 검증

- [x] 3.1 Chrome에 확장 프로그램 로드 테스트 방법 안내
