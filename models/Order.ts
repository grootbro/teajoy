import mongoose, { Schema, Model } from 'mongoose';

interface IOrderProduct {
  id: number;
  name: {
    en: string;
    ru: string;
    th: string;
  };
  price: number;
  qty: number;
  gr: number;
}

interface IOrder {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  products: IOrderProduct[];
  totalAmount: number;
  createdAt: Date;
  status: string;
}

const OrderProductSchema = new Schema<IOrderProduct>({
  id: { type: Number, required: true },
  name: {
    en: { type: String, required: true },
    ru: { type: String, required: true },
    th: { type: String, required: true }
  },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  gr: { type: Number, required: true }
});

const OrderSchema = new Schema<IOrder>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  products: [OrderProductSchema],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }
});

let Order: Model<IOrder>;

try {
  Order = mongoose.model<IOrder>('Order');
} catch {
  Order = mongoose.model<IOrder>('Order', OrderSchema);
}

export default Order;
export type { IOrder, IOrderProduct };
