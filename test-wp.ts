import { getProducts, getProductCategories } from './src/lib/wordpress.js';

async function test() {
  try {
    const products = await getProducts();
    console.log('Products:', JSON.stringify(products, null, 2));
    const categories = await getProductCategories();
    console.log('Categories:', JSON.stringify(categories, null, 2));
  } catch(e) {
    console.error(e);
  }
}
test();
