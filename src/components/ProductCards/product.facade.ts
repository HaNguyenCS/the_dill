import { Product } from '../../data/product';
import { menuService } from '../../service/menuService.ts';

export class ProductFacade {

  private products: Product[] = [];
  private initialized = false;

  async initialize() {
    if (!this.initialized) {
      await this.refreshProducts();
      this.initialized = true;
    }
  }

  async refreshProducts() {
    this.products = await menuService.getAllProducts();
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getPopularProducts(): Product[] {
    return this.products.filter(product => product.isPopular);
  }

  getProductsByCategory(category: Product['category']): Product[] {
    return this.products.filter(product => product.category === category);
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}

export const productFacade = new ProductFacade();