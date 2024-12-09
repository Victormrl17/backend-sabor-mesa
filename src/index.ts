import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import bookingRoutes from './routes/bookingRoutes';
import commentRoutes from './routes/commentRoutes';

dotenv.config();
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en el archivo .env");
}
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
