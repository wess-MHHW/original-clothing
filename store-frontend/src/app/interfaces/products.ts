import { Product } from './product';

export interface Products {
  items: Array<Product>;
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
