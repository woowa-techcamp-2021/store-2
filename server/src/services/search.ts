import { Request } from 'express';
import { getAllKeywords } from 'repositories/search';
import { getRegExp, engToKor } from 'korean-regexp';

async function getKeywords(req: Request): Promise<string[]> {
  const regExp = String(
    getRegExp(engToKor(req.query.keyword as string), {
      initialSearch: true,
    }),
  );
  const keywords = await getAllKeywords(regExp.substring(0, regExp.length - 2).slice(1));
  const result = keywords.map(keyword => {
    return keyword.getDataValue('title');
  });
  return result;
}

export default { getKeywords };
