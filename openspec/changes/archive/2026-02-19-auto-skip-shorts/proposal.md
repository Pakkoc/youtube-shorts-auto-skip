## Why

YouTube Shorts를 시청할 때 영상이 끝나면 수동으로 스크롤해야 다음 영상으로 넘어간다. 이 과정을 자동화하여 끊김 없는 시청 경험을 제공하는 Chrome 확장 프로그램이 필요하다.

## What Changes

- Chrome 확장 프로그램의 기본 구조 생성 (manifest.json, content script)
- YouTube Shorts 페이지에서 현재 재생 중인 영상의 종료를 감지
- 영상 종료 시 자동으로 다음 Shorts로 스크롤

## Capabilities

### New Capabilities
- `shorts-auto-skip`: Shorts 영상 종료 감지 및 자동 다음 영상 이동 기능

### Modified Capabilities
<!-- 신규 프로젝트이므로 수정할 기존 capability 없음 -->

## Impact

- 신규 파일: `manifest.json`, `content.js`
- 대상 사이트: `youtube.com/shorts/*`
- 의존성: Chrome Extensions Manifest V3 API
