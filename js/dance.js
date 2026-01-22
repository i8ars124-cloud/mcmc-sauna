const dancingMan = document.getElementById('dancingMan');
const dancingImg = dancingMan.querySelector('img');

const frames = [
  "../img/dance-1.PNG",
  "../img/dance-02.PNG",
  "../img/dance-03.PNG",
  "../img/dance-04.PNG",
  "../img/dance-05.PNG",
  "../img/dance-06.PNG",
  "../img/dance-07.PNG",
  "../img/dance-08.PNG"
];

let currentFrame = 0;
let animationInterval = null;
let scrollTimer;

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    dancingMan.classList.add('is-active');
  } else {
    dancingMan.classList.remove('is-active');
  }

  clearTimeout(scrollTimer);
  if (!animationInterval) startAnimation();
  scrollTimer = setTimeout(stopAnimation, 100);
});

dancingMan.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

dancingMan.addEventListener('mouseenter', () => {
  dancingImg.src = "img/hover.png";
});

dancingMan.addEventListener('mouseleave', () => {
  dancingImg.src = frames[currentFrame];
});

function startAnimation() {
  if (animationInterval) return;
  animationInterval = setInterval(() => {
    currentFrame = (currentFrame + 1) % frames.length;
    dancingImg.src = frames[currentFrame];
  }, 100);
}

function stopAnimation() {
  clearInterval(animationInterval);
  animationInterval = null;
}




