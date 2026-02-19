(() => {
  let skipped = false;

  function isOnShorts() {
    return location.pathname.startsWith("/shorts/");
  }

  function goToNextShort() {
    const nextButton = document.querySelector(
      '[aria-label="Next video"], [aria-label="다음 동영상"], #navigation-button-down button'
    );
    if (nextButton) {
      nextButton.click();
      return;
    }
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
    );
  }

  setInterval(() => {
    if (!isOnShorts()) return;

    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      if (video.duration > 0 && video.currentTime >= video.duration - 0.3) {
        if (!skipped) {
          skipped = true;
          goToNextShort();
          setTimeout(() => { skipped = false; }, 3000);
        }
      }
    });
  }, 500);
})();
