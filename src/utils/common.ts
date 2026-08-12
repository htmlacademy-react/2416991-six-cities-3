export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getRandomElement = <T>(array: readonly T[]): T | undefined => {
  if (array.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
