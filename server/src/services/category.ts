import { getAllCategories } from 'repositories/category';

interface ICategory {
  code: string;
  name: string;
}

async function getCategories(): Promise<ICategory[]> {
  const categories = await getAllCategories();

  const result = categories.map(category => {
    return { code: category.getDataValue('id'), name: category.getDataValue('name') };
  });

  return result;
}

export default { getCategories };
