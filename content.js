(() => {
  const observedVideos = new WeakSet();

  function handleTimeUpdate(e) {
    const video = e.target;
    if (video.duration > 0 && video.currentTime >= video.duration - 0.5) {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  }

  function attachListener(video) {
    if (observedVideos.has(video)) return;
    observedVideos.add(video);
    video.addEventListener("timeupdate", handleTimeUpdate);
  }

  document.querySelectorAll("video").forEach(attachListener);

  const observer = new MutationObserver(() => {
    document.querySelectorAll("video").forEach(attachListener);
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
