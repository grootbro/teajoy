import Fastify from 'fastify';
import cors from '@fastify/cors';
import mongoose from 'mongoose';
import axios from 'axios';

const fastify = Fastify({
  logger: true
});

// CORS
fastify.register(cors, {
  origin: true
});

// Подключение к MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://spacefox:goodwin2025@localhost:27017/teajoy?authSource=admin';

mongoose.connect(MONGODB_URI).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Mongoose схема для продуктов
const ProductSchema = new mongoose.Schema({
  id: Number,
  name: {
    en: String,
    ru: String,
    th: String
  },
  gr: Number,
  img: String,
  price: Number,
  int: Number,
  qty: Number,
  text: {
    en: String,
    ru: String,
    th: String
  },
  active: Boolean
}, {
  timestamps: true
});

const Product: any = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Health check
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Получить все активные продукты
fastify.get('/api/products', async (request, reply) => {
  try {
    const products = await Product.find({ active: true }).sort({ id: 1 });
    return products;
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch products' });
  }
});

// Получить продукт по ID
fastify.get('/api/products/:id', async (request, reply) => {
  try {
    const { id } = request.params as { id: string };
    const product = await Product.findOne({ id: parseInt(id), active: true });

    if (!product) {
      return reply.status(404).send({ error: 'Product not found' });
    }

    return product;
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch product' });
  }
});

// Обновить продукт и триггернуть revalidation
fastify.put('/api/products/:id', async (request, reply) => {
  try {
    const { id } = request.params as { id: string };
    const { secret } = request.query as { secret?: string };

    // Проверка secret token
    if (secret !== process.env.REVALIDATE_SECRET) {
      return reply.status(401).send({ error: 'Invalid secret token' });
    }

    const updateData = request.body as any;
    const product = await Product.findOneAndUpdate(
      { id: parseInt(id) },
      updateData,
      { new: true }
    );

    if (!product) {
      return reply.status(404).send({ error: 'Product not found' });
    }

    // Триггерим revalidation страницы продукта
    try {
      const revalidateUrl = `http://localhost:4242/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=/shop/${id}`;
      await axios.get(revalidateUrl);

      // Также revalidate главную страницу магазина
      const revalidateShopUrl = `http://localhost:4242/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=/shop`;
      await axios.get(revalidateShopUrl);
    } catch (revalidateError) {
      console.error('Revalidation failed:', revalidateError);
    }

    return {
      success: true,
      product,
      revalidated: ['/shop', `/shop/${id}`]
    };
  } catch (error) {
    reply.status(500).send({ error: 'Failed to update product' });
  }
});

// Создать новый продукт
fastify.post('/api/products', async (request, reply) => {
  try {
    const { secret } = request.query as { secret?: string };

    if (secret !== process.env.REVALIDATE_SECRET) {
      return reply.status(401).send({ error: 'Invalid secret token' });
    }

    const productData = request.body as any;
    const product = await Product.create(productData);

    // Триггерим revalidation
    try {
      const revalidateShopUrl = `http://localhost:4242/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=/shop`;
      await axios.get(revalidateShopUrl);
    } catch (revalidateError) {
      console.error('Revalidation failed:', revalidateError);
    }

    return {
      success: true,
      product,
      revalidated: ['/shop']
    };
  } catch (error) {
    reply.status(500).send({ error: 'Failed to create product' });
  }
});

// Удалить (деактивировать) продукт
fastify.delete('/api/products/:id', async (request, reply) => {
  try {
    const { id } = request.params as { id: string };
    const { secret } = request.query as { secret?: string };

    if (secret !== process.env.REVALIDATE_SECRET) {
      return reply.status(401).send({ error: 'Invalid secret token' });
    }

    const product = await Product.findOneAndUpdate(
      { id: parseInt(id) },
      { active: false },
      { new: true }
    );

    if (!product) {
      return reply.status(404).send({ error: 'Product not found' });
    }

    // Триггерим revalidation
    try {
      const revalidateUrl = `http://localhost:4242/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=/shop/${id}`;
      await axios.get(revalidateUrl);

      const revalidateShopUrl = `http://localhost:4242/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=/shop`;
      await axios.get(revalidateShopUrl);
    } catch (revalidateError) {
      console.error('Revalidation failed:', revalidateError);
    }

    return {
      success: true,
      product,
      revalidated: ['/shop', `/shop/${id}`]
    };
  } catch (error) {
    reply.status(500).send({ error: 'Failed to delete product' });
  }
});

// Ручной revalidation любой страницы
fastify.post('/api/revalidate', async (request, reply) => {
  try {
    const { secret, path } = request.body as { secret?: string; path?: string };

    if (secret !== process.env.REVALIDATE_SECRET) {
      return reply.status(401).send({ error: 'Invalid secret token' });
    }

    if (!path) {
      return reply.status(400).send({ error: 'Path is required' });
    }

    const revalidateUrl = `http://localhost:4242/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=${path}`;
    const response = await axios.get(revalidateUrl);

    return {
      success: true,
      path,
      response: response.data
    };
  } catch (error) {
    reply.status(500).send({
      error: 'Revalidation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Запуск сервера
const start = async () => {
  try {
    const PORT = process.env.FASTIFY_PORT || 4243;
    await fastify.listen({ port: Number(PORT), host: '0.0.0.0' });
    console.log(`Fastify server running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
