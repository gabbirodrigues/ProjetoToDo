import express, { Request, Response } from 'express';
import { Product } from './models/Product'; 
import connectDB from './config/db';

const app = express();

connectDB();

app.use(express.json());

app.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os produtos', error });
  }
});

app.get('/products/:id', async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id)
  res.json(product)
});

app.post('/products', async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o produto', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
