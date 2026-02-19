## Context

신규 Chrome 확장 프로그램 프로젝트. YouTube Shorts 페이지에서 영상 종료 시 자동으로 다음 Shorts로 이동하는 기능을 구현한다. Chrome Extensions Manifest V3 기반으로 개발한다.

## Goals / Non-Goals

**Goals:**
- Shorts 영상 종료 시 자동으로 다음 영상으로 스크롤
- 최소한의 파일 구조로 간결하게 구현

**Non-Goals:**
- 팝업 UI나 설정 페이지 (추후 추가 가능)
- 자동 스킵 on/off 토글 (추후 추가 가능)
- YouTube Shorts 외 다른 플랫폼 지원

## Decisions

### Decision 1: Manifest V3 사용

Manifest V2는 Chrome에서 지원 종료 예정. V3를 사용하여 장기적 호환성을 확보한다.

### Decision 2: Content Script에서 video ended 이벤트 감지

YouTube Shorts는 HTML5 `<video>` 요소를 사용한다. content script에서 `ended` 이벤트를 리스닝하여 영상 종료를 감지한다. YouTube는 SPA이므로 동적으로 생성되는 video 요소를 `MutationObserver`로 감지한다.

### Decision 3: 스크롤 기반 네비게이션

YouTube Shorts는 세로 스크롤로 다음 영상으로 이동한다. `window.scrollBy()`를 사용하여 다음 Shorts로 자동 스크롤한다. 이는 YouTube의 기존 네비게이션 메커니즘을 그대로 활용하는 가장 안정적인 방식이다.

## Risks / Trade-offs

- **YouTube DOM 변경 위험** → YouTube가 DOM 구조를 변경하면 selector 업데이트 필요. 가능한 범용적인 selector 사용으로 완화.
- **SPA 네비게이션 대응** → YouTube는 SPA이므로 페이지 전환 시 content script가 재초기화되지 않을 수 있음. URL 변경 감지 또는 MutationObserver로 대응.
