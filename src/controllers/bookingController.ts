import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import type { AuthenticatedRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

// Crear una reserva
export const createBooking = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { date, peopleCount, restaurantId } = req.body;
  const userId = req.userId;

  if (!userId) {
    res.status(403).json({ error: 'Usuario no autenticado' });
    return;
  }

  try {
    const booking = await prisma.booking.create({
      data: { date: new Date(date), peopleCount, userId, restaurantId },
    });
    res.status(201).json(booking);
  } catch {
    res.status(400).json({ error: 'Error al crear la reserva' });
  }
};

// Obtener reservas de un usuario
export const getBookingsByUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(403).json({ error: 'Usuario no autenticado' });
    return;
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { restaurant: true },
    });
    res.json(bookings);
  } catch {
    res.status(500).json({ error: 'Error al obtener las reservas del usuario' });
  }
};

// Obtener reservas de un restaurante
export const getBookingsByRestaurant = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const bookings = await prisma.booking.findMany({
      where: { restaurantId: Number.parseInt(id, 10) },
      include: { user: true },
    });
    res.json(bookings);
  } catch {
    res.status(500).json({ error: 'Error al obtener las reservas del restaurante' });
  }
};
export const getBookingDetails = async (req: Request, res: Response) => {
  const { id } = req.params;  // ID de la reserva
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(id) },
      include: {
        restaurant: true, // Incluye la información del restaurante relacionado con la reserva
      },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.json(booking);  // Devuelve los detalles de la reserva y el restaurante
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los detalles de la reserva' });
  }
};
export const deleteBooking = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.userId;

  if (!userId) {
    res.status(403).json({ error: 'Usuario no autenticado' });
    return;
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(id) },
    });

    if (!booking) {
      res.status(404).json({ error: 'Reserva no encontrada' });
      return;
    }

    if (booking.userId !== userId) {
      res.status(403).json({ error: 'No tienes permiso para eliminar esta reserva' });
      return;
    }

    await prisma.booking.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Reserva eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
};
