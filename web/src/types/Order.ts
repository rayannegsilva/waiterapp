export interface Order {
  _id: string;
  table: string;
  status: 'DONE' | 'WAITING' | 'IN_PRODUCTION';
  products: {
    _id: string;
    quantity: number;
    product: {
      name: string;
      imagePath: string;
      price: number;
    };
  }[]
}
