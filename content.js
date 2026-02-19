(() => {
  let skipped = false;

  function goToNextShort() {
    // 다음 Shorts 버튼 클릭
    const nextButton = document.querySelector(
      '[aria-label="Next video"], [aria-label="다음 동영상"], #navigation-button-down button'
    );
    if (nextButton) {
      nextButton.click();
      return;
    }
    // fallback: 키보드 아래 화살표
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
    );
  }

  // 모든 video 요소를 주기적으로 체크
  setInterval(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      if (video.duration > 0 && video.currentTime >= video.duration - 0.5) {
        if (!skipped) {
          skipped = true;
          goToNextShort();
        }
      } else if (video.currentTime > 0 && video.currentTime < video.duration - 1) {
        // 새 영상이 재생 중이면 skipped 플래그 리셋
        skipped = false;
      }
    });
  }, 250);
})();
