import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

type Data = {
  success: boolean;
  products?: any[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Connect to database (uses cached connection if available)
    await connectDB();

    // Fetch products with lean() for better performance
    // lean() returns plain JavaScript objects instead of Mongoose documents
    const products = await Product.find({ active: true })
      .sort({ id: 1 })
      .lean()
      .exec();

    // Set cache headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');

    return res.status(200).json({
      success: true,
      products
    });

  } catch (error) {
    console.error('❌ Products API error:', error);

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch products'
    });
  }
}
