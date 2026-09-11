import confetti from 'canvas-confetti';

export const fireConfetti = () => {
  // Center burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FF85A2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#FFD166'],
  });
};

export const fireHeartStarsConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#FF6B8B', '#FFB4C2', '#FFD1DC'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#FFD166', '#FFE66D', '#FF9F1C'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#A0E7E5', '#B4F8C8', '#FBE7C6'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#FFAAA6', '#FF8B94'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#D4A5A5', '#FFD79D'],
  });
};

export const fireSideCannons = () => {
  const end = Date.now() + 1.5 * 1000;
  const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
