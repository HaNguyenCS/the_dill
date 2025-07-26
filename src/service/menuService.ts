import { Product } from '../data/product';
import { menuApi } from '../api/menuApi.ts';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { post } from '@aws-amplify/api';

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
  },

  addProduct(item: Omit<Product, 'id'>): Observable<Product | null> {
    return from(menuApi.create(item)).pipe(
      tap(p => console.log('Created product:', p)),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  },

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