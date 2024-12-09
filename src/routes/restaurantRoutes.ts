import { Router } from 'express';
import type { Request, Response } from 'express';
import { getRestaurants, getRestaurantById, createRestaurant, updateRestaurant } from '../controllers/restaurantController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  getRestaurants(req, res);
});
router.get('/:id', (req: Request, res: Response) => {
  getRestaurantById(req, res);
});
router.post('/', authenticate, (req: Request, res: Response) => {
  createRestaurant(req, res);
});
router.put('/:id', authenticate, (req: Request, res: Response) => {
  updateRestaurant(req, res);
});

export default router;
