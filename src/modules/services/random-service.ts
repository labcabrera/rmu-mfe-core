export const randomRoll = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const openEndedRoll = (): number => {
  let roll = randomRoll(1, 100);
  let mode = roll < 5 ? -1 : roll > 95 ? 1 : 0;
  while (mode !== 0) {
    const newRoll = randomRoll(1, 100);
    roll += newRoll * mode;
    mode = newRoll > 95 ? mode : 0;
  }
  return roll;
};
