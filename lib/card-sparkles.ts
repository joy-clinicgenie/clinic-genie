export interface CardSparkle {
  id: string;
  x: string;
  y: string;
  size: string;
  delay: string;
  duration: string;
}

function cardSparkleRng(seed: number) {
  const x = Math.sin(seed * 99.13) * 43758.5453;
  return x - Math.floor(x);
}

function shuffleSeeded<T>(items: T[], seed: number) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(cardSparkleRng(seed + i * 1.7) * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function buildCardSparkles(cardIndex: number): CardSparkle[] {
  const count = 4 + Math.floor(cardSparkleRng(cardIndex + 11.3) * 4);
  const sparkles = Array.from({ length: count }, (_, i) => {
    const angle = cardSparkleRng(cardIndex * 17 + i * 4.1) * Math.PI * 2;
    const radius = 44 + cardSparkleRng(cardIndex * 9 + i * 2.9) * 16;
    const xPct = 50 + Math.cos(angle) * radius;
    const yPct = 50 + Math.sin(angle) * radius;

    return {
      id: `${cardIndex}-${i}`,
      x: `${xPct.toFixed(2)}%`,
      y: `${yPct.toFixed(2)}%`,
      size: `${(9 + Math.floor(cardSparkleRng(cardIndex + i * 1.3) * 4)).toFixed(0)}px`,
      delay: `${(cardSparkleRng(cardIndex * 23 + i * 3.1) * 3.6).toFixed(2)}s`,
      duration: `${(2.6 + cardSparkleRng(cardIndex + i * 5.7) * 1.8).toFixed(2)}s`,
    };
  });

  return shuffleSeeded(sparkles, cardIndex * 31.7);
}
