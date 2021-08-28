import categoryRepository, { CategoryModel } from 'repositories/category';

async function getCategories(): Promise<CategoryModel> {
  const categories = await categoryRepository.getCategories();

  return categories;
}

export default { getCategories };
