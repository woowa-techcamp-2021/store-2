import { getRegExp, engToKor } from 'korean-regexp';
import searchRepository from 'repositories/search';

async function getKeywords(keyword: string): Promise<string[]> {
  const regExp = String(
    getRegExp(engToKor(keyword), {
      initialSearch: true,
    }),
  );
  const keywords = await searchRepository.getAllKeywords(regExp.substring(0, regExp.length - 2).slice(1));
  const result = keywords.map(v => v.getDataValue('title'));

  return result;
}

export default { getKeywords };
