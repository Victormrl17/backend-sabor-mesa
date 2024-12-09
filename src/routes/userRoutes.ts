import { Router } from 'express';
import type { Request, Response } from 'express';
import { register, login } from '../controllers/userController';

const router = Router();

router.post('/register', (req: Request, res: Response) => {
  register(req, res).catch((error) => res.status(500).json({ error: 'Internal Server Error' }));
});
router.post('/login', (req: Request, res: Response) => {
  login(req, res).catch((error) => res.status(500).json({ error: 'Internal Server Error' }));
});

export default router;
