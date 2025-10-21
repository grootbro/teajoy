import mongoose, { Schema, Model } from 'mongoose';

interface IProductName {
  en: string;
  ru: string;
  th: string;
}

interface IProductText {
  en: string;
  ru: string;
  th: string;
}

interface IProduct {
  id: number;
  name: IProductName;
  gr: number;
  img: string;
  price: number;
  int: number;
  qty: number;
  text: IProductText;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: {
    en: { type: String, required: true },
    ru: { type: String, required: true },
    th: { type: String, required: true }
  },
  gr: { type: Number, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  int: { type: Number, required: true },
  qty: { type: Number, default: 0 },
  text: {
    en: { type: String, required: true },
    ru: { type: String, required: true },
    th: { type: String, required: true }
  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

let Product: Model<IProduct>;

try {
  Product = mongoose.model<IProduct>('Product');
} catch {
  Product = mongoose.model<IProduct>('Product', ProductSchema);
}

export default Product;
export type { IProduct, IProductName, IProductText };
