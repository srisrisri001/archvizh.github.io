// ─── Like / Heart System ──────────────────────────────────────────────────────
// Stores a global like count in localStorage.
// Each browser session can like once (toggles on/off).

const LIKE_COUNT_KEY  = 'archvizLikeCount';
const LIKED_STATE_KEY = 'archvizLiked';

const globalHeart = document.getElementById('globalHeart');
const likeCountEl = document.getElementById('likeCount');

function getLikeCount() {
  return Number(localStorage.getItem(LIKE_COUNT_KEY) || 0);
}

function isLiked() {
  return localStorage.getItem(LIKED_STATE_KEY) === '1';
}

function renderLikes() {
  if (!likeCountEl || !globalHeart) return;
  const count = getLikeCount();
  likeCountEl.textContent = count >= 1000
    ? (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
    : String(count);
  globalHeart.classList.toggle('liked', isLiked());
  globalHeart.setAttribute('aria-label', isLiked() ? 'Unlike' : 'Like this project');
}

function handleHeartClick() {
  const liked = isLiked();
  let count = getLikeCount();
  count = liked ? Math.max(0, count - 1) : count + 1;
  localStorage.setItem(LIKE_COUNT_KEY,  String(count));
  localStorage.setItem(LIKED_STATE_KEY, liked ? '0' : '1');

  // Animate the heart
  globalHeart.classList.add('heart-pop');
  globalHeart.addEventListener('animationend', () => {
    globalHeart.classList.remove('heart-pop');
  }, { once: true });

  renderLikes();
}

if (globalHeart) {
  globalHeart.addEventListener('click', handleHeartClick);
}

renderLikes();
