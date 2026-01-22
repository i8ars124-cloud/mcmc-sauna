window.addEventListener("DOMContentLoaded", () => {
  const girl = document.getElementById("sauna-girl");
  const steam = document.getElementById("steam");
  const footer = document.querySelector("footer");
  const container = document.getElementById("animation-container");

  let triggered = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !triggered){
        triggered = true;
        startAnimation();
      }
    });
  }, { threshold: 0,                  // 交差した瞬間
  rootMargin: "-20% 0px -50% 0px" }); // 画面中央くらいで発火

  observer.observe(container);

  function startAnimation(){
    // スクロール禁止
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // 女の子アニメの時間（例: 2.5秒）
    setTimeout(() => {
      // 白画面（湯気）フェードイン
      steam.style.opacity = 1;

      // 湯気の表示時間（例: 1.5秒）
      setTimeout(() => {
        // 女の子消す
        girl.style.opacity = 0;

        // 白画面フェードアウト
        steam.style.opacity = 0;

        // フッター表示
        footer.style.opacity = 1;

        // スクロール復活
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
      }, 1500);
    }, 4000);
  }
});


