import "tailwindcss/tailwind.css";
import intenseIcon from "@/public/assets/images/intense-icon.png";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/app/components/Spinner";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { Product } from "@/app/types";

export default function Shop({}) {
  const { text, language } = useContext(LanguageContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // SHOW ICONS INSTEAD OF INTENSITY NUMBER
  function showIntensity(intensity: number) {
    return Array.from({ length: intensity }, (_, index) => (
      <Image
        key={index}
        src={intenseIcon}
        alt="Intensity"
        width={16}
        height={16}
        className="inline-block"
      />
    ));
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-8 text-lg">
      {products.map((prod) => (
        <Link
          href={`/shop/${prod.id}`}
          key={prod.id}
          className="group flex flex-col flex-wrap bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-300 dark:to-stone-400 
          mr-auto text-center rounded-xl shadow-xl items-center p-5 w-64 border-stone-300 border-[1px] hover:scale-105 mx-auto transition-transform duration-300"
        >
          <div className="relative overflow-hidden ml-auto mr-auto p-3 rounded-xl w-40 h-52 flex items-center justify-center">
            <Image
              src={prod.img}
              alt="Product"
              width={200}
              height={250}
              className="transform-gpu object-contain w-full h-full"
            />
          </div>
          <div className="mb-3">
            <p className="text-xl font-semibold">{prod.name.en}</p>
            <p>{showIntensity(prod.int)}</p>
            <p>{prod.gr} gr</p>
            <p>{prod.price} ฿</p>
            <p className="text-xs" id="lime-text">
              {text.inStock}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
