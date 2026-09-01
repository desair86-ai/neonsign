'use server';

import { getProductCategories } from '@/lib/wordpress';

export async function getCategoriesAction() {
  const categories = await getProductCategories();
  return categories.filter((c: any) => c.name !== "Uncategorized");
}
