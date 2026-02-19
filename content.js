(() => {
  let skipped = false;
  const observedVideos = new WeakSet();

  function isOnShorts() {
    return location.pathname.startsWith("/shorts/");
  }

  function goToNextShort() {
    // 방법 1: 다음 버튼 클릭
    const nextButton = document.querySelector(
      '[aria-label="Next video"], [aria-label="다음 동영상"], #navigation-button-down button'
    );
    if (nextButton) {
      console.log("[AutoSkip] 버튼 찾음:", nextButton.ariaLabel || "unknown");
      nextButton.click();
    }

    // 방법 2: 버튼 클릭이 안 먹을 수 있으니 키보드 이벤트도 같이 발생
    setTimeout(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
      );
      console.log("[AutoSkip] ArrowDown 이벤트 발생");
    }, 300);
  }

  function onTimeUpdate(e) {
    if (!isOnShorts()) return;
    const video = e.target;
    if (video.duration > 0 && video.currentTime >= video.duration - 0.5) {
      if (!skipped) {
        console.log(`[AutoSkip] 영상 종료 감지 - currentTime: ${video.currentTime.toFixed(2)}, duration: ${video.duration.toFixed(2)}`);
        skipped = true;
        goToNextShort();
        setTimeout(() => { skipped = false; }, 3000);
      }
    }
  }

  function attachListener(video) {
    if (observedVideos.has(video)) return;
    observedVideos.add(video);
    video.addEventListener("timeupdate", onTimeUpdate);
    console.log("[AutoSkip] video 리스너 등록");
  }

  document.querySelectorAll("video").forEach(attachListener);

  const observer = new MutationObserver(() => {
    document.querySelectorAll("video").forEach(attachListener);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
