import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import type { AuthenticatedRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

// Agregar un comentario
export const addComment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { content, rating, restaurantId } = req.body;
  const userId = req.userId;

  if (!userId) {
    res.status(403).json({ error: 'Usuario no autenticado' });
    return;
  }

  try {
    const comment = await prisma.comment.create({
      data: { content, rating, userId, restaurantId },
    });
    res.status(201).json(comment);
  } catch {
    res.status(400).json({ error: 'Error al agregar el comentario' });
  }
};

// Obtener comentarios de un restaurante
export const getCommentsByRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { restaurantId: Number.parseInt(id, 10) },
      include: { user: true },
    });
    res.json(comments);
  } catch {
    res.status(500).json({ error: 'Error al obtener los comentarios del restaurante' });
  }
};
export const getRestaurantDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: Number(id) },
      include: {
        comments: true, // Incluye los comentarios para calcular la puntuación promedio
      },
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }

    // Calculamos el número de reseñas y la puntuación promedio
    const reviewCount = restaurant.comments.length;
    const averageRating =
      reviewCount > 0
        ? restaurant.comments.reduce((sum, comment) => sum + comment.rating, 0) / reviewCount
        : null;

    res.json({
      ...restaurant,
      reviewCount,
      averageRating,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles del restaurante' });
  }
};
