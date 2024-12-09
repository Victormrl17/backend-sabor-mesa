import { Router } from 'express';
import { addComment, getCommentsByRestaurant } from '../controllers/commentController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Rutas protegidas
router.post('/', authenticate, addComment);
router.get('/restaurant/:id', getCommentsByRestaurant);

export default router;
