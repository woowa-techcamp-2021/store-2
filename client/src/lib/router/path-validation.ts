export const checkPathValidation = (
  currentPath: string,
  path: string,
  validatePath: Function,
): boolean => {
  const pathSplit = path.split('/');
  const currentPathSplit = currentPath.split('/');

  if (!validatePath(pathSplit, currentPathSplit)) return false;

  const result = pathSplit.reduce((acc, cur, i) => {
    if (!/^:/.test(cur)) {
      return acc && cur === currentPathSplit[i];
    }
    return true;
  }, true);

  return result;
};

export const exactPathValidation = (
  pathSplit: string[],
  currentPathSplit: string[],
) => {
  return pathSplit.length === currentPathSplit.length;
};

export const pathValidation = (
  pathSplit: string[],
  currentPathSplit: string[],
) => {
  return pathSplit.length <= currentPathSplit.length;
};
