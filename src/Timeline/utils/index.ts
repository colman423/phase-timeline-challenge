const ATOM_UNIT = 10;

const SCREEN_PIXEL_RATIO = 1;

export const getAtomTime = (time: number) => {
  return Math.round(time / ATOM_UNIT) * ATOM_UNIT;
};

export const pixelToTime = (screenX: number) => {
  return screenX * SCREEN_PIXEL_RATIO;
};

export const timeToPixel = (time: number) => {
  return time / SCREEN_PIXEL_RATIO;
};
