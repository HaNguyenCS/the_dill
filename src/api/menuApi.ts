import { del, get, post, put } from 'aws-amplify/api';
import { Product } from '../data/product';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const menuApi = {
    async getAll(): Promise<Product[]> {
    try {
      const restOp = await get({
        apiName: 'menuAPI',
        path:    '/menu',
      });

      const apiResponse = await restOp.response;
      const products = (await apiResponse.body.json()) as unknown as Product[];

      return products;
    } catch (err) {
      console.error('Error fetching products:', err);
      return [];
    }
  }

//   async create(product: Omit<Product, 'id'>) {
//     const restOp = await post({
//       apiName: 'menuAPI',
//       path: 'menu',
//       options: { body: product }
//     });
//     return restOp.response.body.json();
//   },

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