import { Product } from '../data/product';
import { menuApi } from '../api/menuApi.ts';
import { catchError, from, map, Observable, of, tap } from 'rxjs';

export const menuService = {

  getAll(): Observable<Product[]> {
    return from(menuApi.getAll()).pipe(
      map(products => products as Product[]),
      tap(products => {
        console.log('Fetched products:', products);
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]);
      })
    );
  }

  // async addProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
  //   try {
  //     return await menuApi.create(product);
  //   } catch (error) {
  //     console.error('Error adding product:', error);
  //     return null;
  //   }
  // },

  // async updateProduct(product: Product): Promise<Product | null> {
  //   try {
  //     return await menuApi.update(product);
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //     return null;
  //   }
  // },

  // async deleteProduct(id: string): Promise<boolean> {
  //   try {
  //     return await menuApi.delete(id);
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //     return false;
  //   }
  // }
};