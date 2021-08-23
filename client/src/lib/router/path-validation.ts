export const checkPathValidation = (
  currentPath: string,
  path: string,
  validatePath: (pathSplit: string[], currentPathSplit: string[]) => boolean,
): boolean => {
  const pathSplit = path.split('/');
  const currentPathSplit = /^\/$/.test(currentPath)
    ? currentPath.split('/')
    : currentPath.replace(/\/$/, '').split('/');
  if (!validatePath(pathSplit, currentPathSplit)) return false;

  const result = pathSplit.reduce((acc, cur, i) => {
    if (!/^:/.test(cur)) {
      return acc && cur === currentPathSplit[i];
    }
    return acc;
  }, true);

  return result;
};

export const exactPathValidation = (pathSplit: string[], currentPathSplit: string[]): boolean => {
  return pathSplit.length === currentPathSplit.length;
};

export const pathValidation = (pathSplit: string[], currentPathSplit: string[]): boolean => {
  return pathSplit.length <= currentPathSplit.length;
};
