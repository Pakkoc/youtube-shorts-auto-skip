(() => {
  let skipped = false;
  let lastTime = 0;
  const observedVideos = new WeakSet();

  function isOnShorts() {
    return location.pathname.startsWith("/shorts/");
  }

  function getNextShortsUrl() {
    const currentUrl = location.href;
    const links = document.querySelectorAll('a[href*="/shorts/"]');
    for (const link of links) {
      const href = link.href;
      if (href !== currentUrl && /\/shorts\/[a-zA-Z0-9_-]+$/.test(new URL(href).pathname) && !href.includes("/hashtag/")) {
        return href;
      }
    }
    return null;
  }

  function goToNextShort(useUrlNavigation) {
    if (useUrlNavigation) {
      const nextUrl = getNextShortsUrl();
      if (nextUrl) {
        console.log("[AutoSkip] 최소화 상태 - URL 이동:", nextUrl);
        location.href = nextUrl;
        return;
      }
    }

    const nextButton = document.querySelector(
      '[aria-label="Next video"], [aria-label="다음 동영상"], #navigation-button-down button'
    );
    if (nextButton) {
      console.log("[AutoSkip] 버튼 찾음:", nextButton.ariaLabel || "unknown");
      nextButton.click();
      return;
    }

    // 최후 fallback: URL 이동
    const nextUrl = getNextShortsUrl();
    if (nextUrl) {
      console.log("[AutoSkip] fallback URL 이동:", nextUrl);
      location.href = nextUrl;
    }
  }

  function checkVideo() {
    if (!isOnShorts()) return;
    const video = document.querySelector("video");
    if (!video || !video.duration) return;

    const currentTime = video.currentTime;
    const duration = video.duration;

    // 감지 1: 영상 끝에 도달 (활성 탭)
    if (currentTime >= duration - 0.5) {
      if (!skipped) {
        console.log(`[AutoSkip] 영상 종료 감지 - currentTime: ${currentTime.toFixed(2)}, duration: ${duration.toFixed(2)}`);
        skipped = true;
        goToNextShort(false);
        setTimeout(() => { skipped = false; }, 3000);
      }
    }
    // 감지 2: 루프 감지 (최소화 상태에서 영상이 다시 시작됨)
    else if (lastTime > duration * 0.8 && currentTime < duration * 0.2) {
      if (!skipped) {
        console.log(`[AutoSkip] 루프 감지 - lastTime: ${lastTime.toFixed(2)}, currentTime: ${currentTime.toFixed(2)}`);
        skipped = true;
        goToNextShort(true);
        setTimeout(() => { skipped = false; }, 3000);
      }
    }

    lastTime = currentTime;
  }

  // timeupdate 이벤트 (활성 탭에서 빠른 감지)
  function attachListener(video) {
    if (observedVideos.has(video)) return;
    observedVideos.add(video);
    video.addEventListener("timeupdate", checkVideo);
    console.log("[AutoSkip] video 리스너 등록");
  }

  document.querySelectorAll("video").forEach(attachListener);

  const observer = new MutationObserver(() => {
    document.querySelectorAll("video").forEach(attachListener);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // setInterval 백업 (최소화 시)
  setInterval(checkVideo, 1000);
})();
