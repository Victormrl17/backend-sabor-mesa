import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import type { AuthenticatedRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

// Obtener todos los restaurantes
export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch {
    res.status(500).json({ error: 'Error al obtener los restaurantes' });
  }
};

// Obtener un restaurante por ID
export const getRestaurantById = async (req: Request, res: Response) => {

  const { id } = req.params;
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: Number.parseInt(id, 10) },
    });
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }
    res.json(restaurant);
  } catch {
    res.status(500).json({ error: 'Error al obtener el restaurante' });
  }
};

// Crear un nuevo restaurante
export const createRestaurant = async (req: AuthenticatedRequest, res: Response) => {
  const { name, location, cuisine, images } = req.body;
  try {
    const newRestaurant = await prisma.restaurant.create({
      data: { name, location, cuisine, images },
    });
    res.status(201).json(newRestaurant);
  } catch {
    res.status(400).json({ error: 'Error al crear el restaurante' });
  }
};

// Actualizar un restaurante existente
export const updateRestaurant = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name, location, cuisine, images } = req.body;
  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: Number.parseInt(id, 10) },
      data: { name, location, cuisine, images },
    });
    res.json(updatedRestaurant);
  } catch {
    res.status(400).json({ error: 'Error al actualizar el restaurante' });
  }
};
