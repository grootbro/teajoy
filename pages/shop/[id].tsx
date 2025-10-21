import { Product } from "@/app/types/index";
import intenseIcon from "@/public/assets/images/intense-icon.png";
import { BsArrowLeft } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "@/app/contexts/CartContext";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { translations } from "@/app/utils/translations";
import Head from "next/head";
import Spinner from "@/app/components/Spinner";

export default function ProductDetail({ product: initialProduct }: { product: Product | null }) {
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [isInCart, setIsInCart] = useState(false);
  const { text, language } = useContext(LanguageContext);
  const cartContext = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const [cartStatus, setCartStatus] = useState("");
  const addToCart = cartContext?.addToCart || (() => {});
  const removeFromCart = cartContext?.removeFromCart || (() => {});
  const deleteFromCart = cartContext?.deleteFromCart || (() => {});
  const { cart } = cartContext || { cart: [] };

  // CHECK IF PRODUCT IS IN CART WHEN PAGE IS RENDERED
  useEffect(() => {
    if (!product) return;
    const cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
      setIsInCart(true);
      setQuantity(cartItem.qty);
    } else {
      setIsInCart(false);
      setQuantity(0);
    }
  }, [cart, product]);

  // + BUTTON FUNCTION
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setIsInCart(true);
    setQuantity(quantity + 1);
    setCartStatus(translations[language].addedtoCart);
    const timer = setTimeout(() => {
      setCartStatus("");
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  };

  // - BUTTON FUNCTION
  const handleRemoveFromCart = (product: Product) => {
    if (quantity === 1) {
      deleteFromCart(product);
      setIsInCart(false);
      setQuantity(quantity - 1);
      setCartStatus(translations[language].removedFromCart);
      const timer = setTimeout(() => {
        setCartStatus("");
      }, 800);
      return () => {
        clearTimeout(timer);
      };
    } else {
      removeFromCart(product);
      setQuantity(quantity - 1);
      setCartStatus(translations[language].removedFromCart);
      const timer = setTimeout(() => {
        setCartStatus("");
      }, 800);
      return () => {
        clearTimeout(timer);
      };
    }
  };

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <title>TeaJoy shop🍯</title>
        <meta name="description" content="TeaJoy co · Strain Catalog" />
        <meta property="og:image" content="https://res.cloudinary.com/dov6nv91n/image/upload/v1725063333/cougsirqq9yhcqog2jel.png"/>
      </Head>
    <div>
      <div
        className="flex flex-col md:flex-row mr-auto ml-auto xl:w-3/5 
      bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-300 dark:to-stone-400 
      rounded-xl shadow-xl px-4 py-8 md:p-8 border-stone-300 border-[1px] gap-6 md:gap-0"
      >
        <div className="md:w-2/6 m-auto relative overflow-hidden flex items-center justify-center">
          <Image
            src={product.img}
            alt={product.name.en}
            width={200}
            height={250}
            className="mr-auto ml-auto w-44 h-72 object-contain duration-500
                hover:scale-105 transition-[transform]"
          />
        </div>
        <div className="pl-4 md:w-4/6 text-lg md:mt-8 mt:0 md:text-left text-center">
          <h1 className="text-2xl font-semibold">{product.name.en}</h1>
          <div className="mt-2">
            {Array.from({ length: product.int }, (_, index) => (
              <Image
                key={index}
                src={intenseIcon}
                alt="Intensity"
                width={16}
                height={16}
                className="inline-block"
              />
            ))}
          </div>
          <p className="text-lg mt-2">{product.gr} gr</p>
          <p className="text-lg mt-2">{product.price} ฿</p>
          <p className="mt-2 text-sm" id="lime-text">
            {text.inStock}
          </p>
          <br />
          <p>{product.text[language]}</p>
          <br />
          {isInCart ? (
            <div className="flex flex-row gap-2 items-center">
              <div
                className="bg-white rounded-xl shadow-md px-3 text-xl cursor-pointer
                       active:text-neutral-400 transition-transform duration-200"
                onClick={() => handleRemoveFromCart(product)}
              >
                <p>-</p>
              </div>
              <p>{quantity}</p>
              <div
                className="bg-white rounded-xl shadow-md px-3 text-xl cursor-pointer
                       active:text-neutral-400 transition-transform duration-200"
                onClick={() => handleAddToCart(product)}
              >
                <p>+</p>
              </div>
              <Link href="/cart" className="ml-2">
                <BsCart3 className={`w-6 h-6 text-lime-700 dark:text-lime-300 hover:scale-110 transition-all duration-200 cursor-pointer ${cartStatus ? 'animate-bounce' : ''}`} />
              </Link>
              {cartStatus && (
                <div className="italic text-md text-neutral-500 dark:text-neutral-100 ml-1">
                  {cartStatus}
                </div>
              )}
            </div>
          ) : (
            <div
              id="main-button"
              className="border-[1px] border-neutral-400 rounded-xl bg-neutral-50 px-4 py-1 
              dark:bg-stone-300 shadow-md hover:bg-green-100 transition-colors duration-300 
              inline-block cursor-pointer active:text-neutral-400"
              onClick={() => handleAddToCart(product)}
            >
              <p className="text-base">{text.addToCart}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center mt-10 gap-2 dark:text-orange-50">
        <Link href="/shop" className="inline-block">
          <BsArrowLeft alt="Left Arrow" className="w-5 h-5 mb-1 inline-block" />
        </Link>
        <Link
          href="/shop"
          className="inline-block active:text-neutral-400 transition-colors duration-300"
        >
          <p className="inline-block text-lg">{text.backToProducts}</p>
        </Link>
      </div>
    </div>
    </>);
}

// GET ID NUMBER FROM PARAM
export async function getStaticPaths() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://spacefox:goodwin2025@localhost:27017/teajoy?authSource=admin';
    const mongoose = require('mongoose');

    await mongoose.connect(MONGODB_URI);

    const ProductSchema = new mongoose.Schema({
      id: Number,
      active: Boolean
    });

    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
    const products = await Product.find({ active: true }, 'id');

    const paths = products.map((product: any) => ({
      params: { id: product.id.toString() },
    }));

    await mongoose.connection.close();

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://spacefox:goodwin2025@localhost:27017/teajoy?authSource=admin';
    const mongoose = require('mongoose');

    await mongoose.connect(MONGODB_URI);

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
    });

    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
    const productId = parseInt(params.id);
    const product = await Product.findOne({ id: productId, active: true }).lean();

    await mongoose.connection.close();

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
}
