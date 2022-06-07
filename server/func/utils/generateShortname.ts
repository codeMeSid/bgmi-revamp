export const generateShortname = (name: string) => {
  const splitName = name.split(" ");
  if (splitName.length === 1) return splitName[0].slice(0, 3);
  else if (splitName.length === 2) {
    if (splitName[1].length >= 2)
      return splitName[0][0] + splitName[1].slice(0, 2);
    else return splitName[0].slice(0, 2) + splitName[1];
  } else return splitName[0][0] + splitName[1][0] + splitName[2][0];
};
