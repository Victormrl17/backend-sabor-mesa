import { Router } from 'express';
import type { Request, Response } from 'express';
import { createBooking, getBookingsByUser, getBookingsByRestaurant } from '../controllers/bookingController';
import { authenticate } from '../middleware/authMiddleware';
import type { AuthenticatedRequest } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, (req: Request, res: Response) => createBooking(req as AuthenticatedRequest, res));
router.get('/user', authenticate, (req: Request, res: Response) => getBookingsByUser(req as AuthenticatedRequest, res));
router.get('/restaurant/:id', getBookingsByRestaurant);

export default router;
