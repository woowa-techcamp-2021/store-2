const splitStyleString = (styleString: string): string[] => {
  const styleList = styleString
    .replace(/[}]/g, '}\n')
    .replace(/@import/g, '\n@import')
    .replace(/@font-face/g, '\n@font-face')
    .trim()
    .split('\n')
    .filter(v => v);

  return styleList;
};

export default splitStyleString;
