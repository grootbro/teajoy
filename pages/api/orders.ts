import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

type Data = {
  success: boolean;
  message?: string;
  orderId?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Connect to database (uses cached connection if available)
    await connectDB();

    const { fullName, email, address, phoneNumber, products, totalAmount } = req.body;

    // Validate required fields
    if (!fullName || !email || !address || !phoneNumber || !products || !totalAmount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Products must be a non-empty array'
      });
    }

    // Create order
    const order = await Order.create({
      fullName,
      email,
      address,
      phoneNumber,
      products,
      totalAmount,
      status: 'pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: order._id.toString()
    });

  } catch (error) {
    console.error('❌ Order API error:', error);

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order'
    });
  }
}
