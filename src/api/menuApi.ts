import { del, get, post, put } from 'aws-amplify/api';
import { Product } from '../data/product';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

export const menuApi = {

  async getAll(): Promise<Product[]> {
    try {
      const restOp = await get({
        apiName: 'menuAPI',
        path: '/menu',
      });

      const apiResponse = await restOp.response;
      const products = (await apiResponse.body.json()) as unknown as Product[];

      return products;
    } catch (err) {
      console.error('Error fetching products:', err);
      return [];
    }
  },

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      const newProduct = {
        ...product,
        id: uuidv4(),
      }

      const restOp = await post({
        apiName: 'menuAPI',
        path: '/menu',
        options: { body: newProduct }
      });
      const apiResponse = await restOp.response;
      const createdProduct = (await apiResponse.body.json()) as unknown as Product;

      return createdProduct;
    } catch (err) {
      console.error('Error creating product:', err);
      throw err;
    }
  },

//   async update(product: Product) {
//     const restOp = await put({
//       apiName: 'menuAPI',
//       path: `menu/${product.id}`,
//       options: { body: product }
//     });
//     return restOp.response.body.json();
//   },

//   async delete(id: string) {
//     const restOp = await del({
//       apiName: 'menuAPI',
//       path: `menu/${id}`
//     });
//     return restOp.response.statusCode === 204;
//   }
};