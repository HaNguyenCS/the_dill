import { del, get, post, put } from 'aws-amplify/api';
import { Product } from '../data/product';

export const menuService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const restOp = get({
        apiName: 'menuAPI',
        path: '/menu',
      });
      console.log(restOp);
    //   const  body  = await restOp.response;
    //   const products = await body.json();
    //   return products;
      // Uncomment and adjust the following lines as needed to parse the response:
      // const { body } = await restOp.response;
      // const products = await body.json();
      // return products;
      return []; // Temporary return to satisfy the return type
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

//   async addProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
//     try {
//       const response = await post('dillMenu', '/menu', {
//         body: product
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error adding product:', error);
//       return null;
//     }
//   },

//   async updateProduct(product: Product): Promise<Product | null> {
//     try {
//       const response = await put('dillMenu', `/menu/${product.id}`, {
//         body: product
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error updating product:', error);
//       return null;
//     }
//   },

//   async deleteProduct(id: string): Promise<boolean> {
//     try {
//       await del('dillMenu', `/menu/${id}`, {});
//       return true;
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       return false;
//     }
//   }
};