import { Router } from 'express';
import type { Request, Response } from 'express';
import { createBooking, getBookingsByUser, getBookingsByRestaurant, deleteBooking } from '../controllers/bookingController';
import { authenticate } from '../middleware/authMiddleware';
import type { AuthenticatedRequest } from '../middleware/authMiddleware';
import {  getBookingDetails } from '../controllers/bookingController';

const router = Router();

router.post('/', authenticate, (req: Request, res: Response) => createBooking(req as AuthenticatedRequest, res));
router.get('/user', authenticate, (req: Request, res: Response) => getBookingsByUser(req as AuthenticatedRequest, res));
router.get('/restaurant/:id', getBookingsByRestaurant);
router.get('/:id/details', (req: Request, res: Response) => {
  getBookingDetails(req, res);
});
router.delete('/:id', authenticate, (req: Request, res: Response) => {
  deleteBooking(req as AuthenticatedRequest, res);
});
export default router;
