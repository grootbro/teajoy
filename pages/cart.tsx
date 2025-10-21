import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Product } from "@/app/types";
import { CartContext } from "@/app/contexts/CartContext";
import { useContext, useState } from "react";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { LanguageContext } from "@/app/contexts/LanguageContext";

export default function CartPage() {
  const { text, language } = useContext(LanguageContext);
  const cartContext = useContext(CartContext);
  const { cart } = useContext(CartContext) || { cart: [] };
  const addToCart = cartContext?.addToCart || (() => {});
  const removeFromCart = cartContext?.removeFromCart || (() => {});
  const deleteFromCart = cartContext?.deleteFromCart || (() => {});
  const isCartEmpty = cart ? cart.length === 0 : true;

  // CALCULATE SUBTOTAL
  const subtotal = cart.reduce((acc, cartProd) => {
    return acc + cartProd.qty * cartProd.price;
  }, 0);

  // DETERMINE SHIPPING FEE
  const shippingFee = subtotal < 100 ? 6 : 0;

  // CALCULATE TOTAL
  const total = subtotal + shippingFee;

  return (
    <div className="text-lg">
      {isCartEmpty ? (
        <div className="flex flex-col gap-6 items-center justify-center mx-auto mt-10 mb-10 min-h-[50vh]">
          <p className="text-xl dark:text-orange-50">{text.cartEmpty}</p>
          <Link href="/shop">
            <div
              id="main-button"
              className="border-[1px] border-neutral-400 rounded-xl bg-neutral-50 px-5 py-2 shadow-md
            hover:bg-green-100 transition-colors duration-300 inline-block mt-3 text-lg mx-auto
            active:text-neutral-400 dark:bg-stone-300"
            >
              {text.shoppingButton}
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8 pb-10">
          <div className="flex flex-col mx-auto items-center mt-10">
            <p className="text-xl mb-5 dark:text-orange-50">{text.cartTitle}</p>
            <div
              className="bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-300 dark:to-stone-400
              rounded-xl shadow-xl px-4 md:px-8 lg:px-14 py-4 md:py-4 border-stone-300 border-[1px] max-w-full"
            >
              {cart.map((cartProd: Product, index: number) => (
                <div key={index}>
                  {/* Mobile Layout */}
                  <div className="md:hidden py-4">
                    <div className="flex gap-3">
                      {/* Image */}
                      <div className="flex-shrink-0 w-20 h-28 flex items-center justify-center">
                        <Image
                          src={cartProd.img}
                          alt="Product"
                          width={80}
                          height={112}
                          className="w-20 h-28 rounded-lg object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-base font-medium line-clamp-2 flex-1">
                            {cartProd.name.en}
                          </p>
                          <div
                            className="bg-red-300 rounded-lg shadow-md px-2.5 py-1 text-lg cursor-pointer
                            active:text-neutral-400 transition-transform duration-200 flex-shrink-0 active:scale-95"
                            onClick={() => deleteFromCart(cartProd)}
                          >
                            <p>×</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <div
                              className="bg-white rounded-lg shadow-md px-3 py-1 text-lg cursor-pointer
                              active:text-neutral-400 transition-transform duration-200 active:scale-95"
                              onClick={() => removeFromCart(cartProd)}
                            >
                              <p>−</p>
                            </div>
                            <p className="text-base font-medium w-8 text-center">{cartProd.qty}</p>
                            <div
                              className="bg-white rounded-lg shadow-md px-3 py-1 text-lg cursor-pointer
                              active:text-neutral-400 transition-transform duration-200 active:scale-95"
                              onClick={() => addToCart(cartProd)}
                            >
                              <p>+</p>
                            </div>
                          </div>

                          {/* Price */}
                          <p className="text-lg font-semibold">
                            {cartProd.qty * cartProd.price} ฿
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex flex-row items-center gap-4 lg:gap-14 h-32">
                    <div className="flex flex-row gap-2">
                      <div
                        className="bg-white rounded-xl shadow-md px-3 text-xl cursor-pointer
                        active:text-neutral-400 transition-transform duration-200"
                        onClick={() => removeFromCart(cartProd)}
                      >
                        <p>-</p>
                      </div>
                      <p className="">{cartProd.qty}</p>
                      <div
                        className="bg-white rounded-xl shadow-md px-3 text-xl cursor-pointer
                        active:text-neutral-400 transition-transform duration-200"
                        onClick={() => addToCart(cartProd)}
                      >
                        <p>+</p>
                      </div>
                    </div>
                    <div id="cart-image" className="w-16 h-24 flex items-center justify-center">
                      <Image
                        src={cartProd.img}
                        alt="Product"
                        width={100}
                        height={150}
                        className="w-16 h-24 object-contain"
                      />
                    </div>
                    <div className="mr-auto flex">
                      <p className="">{cartProd.name.en}</p>
                    </div>
                    <div className="ml-auto">
                      <p className="">{cartProd.qty * cartProd.price} ฿</p>
                    </div>
                    <div
                      className="bg-red-300 rounded-xl shadow-md px-3 text-xl cursor-pointer
                      active:text-neutral-400 transition-transform duration-200 mb-1"
                      onClick={() => deleteFromCart(cartProd)}
                    >
                      <p>x</p>
                    </div>
                  </div>

                  <div>
                    <hr className="border-1 border-stone-400" />
                  </div>
                </div>
              ))}

              <div className="flex flex-col mx-auto items-center gap-5 md:gap-8">
                <div className="flex flex-row gap-20 sm:gap-32 md:gap-96 mt-6 md:mt-10 w-full justify-center">
                  <div className="flex flex-col text-left gap-2.5 md:gap-3 text-base md:text-base">
                    <p className="">{text.subtotal}:</p>
                    <p className="">{text.shipping}:</p>
                    <p className="text-xl md:text-2xl mt-4 md:mt-6 font-semibold">{text.total}:</p>
                  </div>
                  <div className="flex flex-col text-right gap-2.5 md:gap-3 text-base md:text-base">
                    <p>{subtotal} ฿</p>
                    {shippingFee === 0 ? (
                      <p id="lime-text">{shippingFee} ฿</p>
                    ) : (
                      <p>{shippingFee} ฿</p>
                    )}
                    <p className="mt-4 md:mt-6 font-semibold text-xl md:text-base">{total} ฿</p>
                  </div>
                </div>

                <Link href="/checkout" className="ml-auto mr-auto w-full md:w-auto px-4 md:px-0">
                  <div
                    id="main-button"
                    className="border-[1px] border-neutral-700 rounded-xl items-center bg-neutral-50 dark:bg-stone-300
                    px-8 md:px-10 py-3 md:py-2 shadow-md hover:bg-green-100 transition-colors duration-300
                    text-lg md:text-xl active:text-neutral-400 mb-4 md:mb-6 text-center"
                  >
                    {text.checkoutButton}
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 dark:text-orange-50">
            <Link href="/shop" className="inline-block">
              <BsArrowLeft
                alt="Left Arrow"
                className="w-5 h-5 mb-1 inline-block"
              />
            </Link>
            <Link
              href="/shop"
              className="inline-block active:text-neutral-400 transition-colors duration-300"
            >
              <p className="inline-block text-lg">{text.continueShopping}</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
