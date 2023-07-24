import { Router } from 'express';
import path from 'node:path';
import multer from 'multer';
import { listCategories } from './useCases/categories/listCategories';
import { createCategory } from './useCases/categories/createCategory';
import { listProducts } from './useCases/products/listProducts';
import { createProduct } from './useCases/products/createProduct';
import { listProductsByCategory } from './useCases/categories/listProductsByCategory';
import { listOrders } from './useCases/ordes/listOrdes';
import { createOrder } from './useCases/ordes/createOrder';
import { changeOrderStatus } from './useCases/ordes/changeOrderStatus';
import { deleteOrder } from './useCases/ordes/deleteOrder';


export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

//List categories
router.get('/categories', listCategories);

// Create Category
router.post('/categories', createCategory);

// List Products
router.get('/products', listProducts);

// Create Product
router.post('/products', upload.single('image'), createProduct);

// Get Product by Category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List Orders
router.get('/orders', listOrders);

// Create Order
router.post('/orders', createOrder);

// Change Order Status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/cancel Order
router.delete('/orders/:orderId', deleteOrder);
