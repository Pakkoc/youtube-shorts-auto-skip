# shorts-auto-skip Specification

## Purpose
TBD - created by archiving change auto-skip-shorts. Update Purpose after archive.
## Requirements
### Requirement: Content script injection on Shorts pages
확장 프로그램은 YouTube Shorts 페이지(`youtube.com/shorts/*`)에서 content script를 자동으로 주입해야 한다(SHALL).

#### Scenario: Shorts 페이지 방문 시 content script 로드
- **WHEN** 사용자가 `youtube.com/shorts/*` URL로 이동하면
- **THEN** content script가 페이지에 주입된다

#### Scenario: Shorts가 아닌 페이지에서는 동작하지 않음
- **WHEN** 사용자가 `youtube.com/shorts/*`가 아닌 YouTube 페이지에 있으면
- **THEN** content script가 주입되지 않는다

### Requirement: 영상 종료 감지
content script는 현재 화면에 보이는 Shorts 영상의 종료를 감지해야 한다(SHALL).

#### Scenario: 영상이 끝까지 재생됨
- **WHEN** 현재 Shorts 영상의 재생이 끝나면 (ended 이벤트)
- **THEN** 시스템이 영상 종료를 감지한다

### Requirement: 자동 다음 Shorts 이동
영상 종료가 감지되면 시스템은 자동으로 다음 Shorts로 이동해야 한다(SHALL).

#### Scenario: 영상 종료 후 자동 스크롤
- **WHEN** 현재 Shorts 영상이 종료되면
- **THEN** 자동으로 아래로 스크롤하여 다음 Shorts가 화면에 표시된다

