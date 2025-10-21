import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../contexts/CartContext";
import { LanguageContext } from "../contexts/LanguageContext";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/images/joytea.webp";
import logo2 from "@/public/assets/images/joytea.webp";
import leaf from "@/public/assets/images/leaf2.png";
import cartIcon from "@/public/assets/images/cart.png";
import cartIcon2 from "@/public/assets/images/cart2.png";
import { HiMoon, HiSun } from "react-icons/hi";

export default function Navbar() {
  const { text, language, handleChangeLanguage, flag } =
    useContext(LanguageContext);
  const { cart } = useContext(CartContext) || { cart: [] };
  const isCartEmpty = cart ? cart.length === 0 : true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setisDark] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLanguageChange = (selectedLanguage: any) => {
    handleChangeLanguage(selectedLanguage);
    toggleDropdown(); // Close the dropdown after selecting a language
  };

  function handleModeClick() {
    setisDark(!isDark);
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        isMenuOpen
      ) {
        closeMenu();
      }
    };

    const closeMenu = () => {
      setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("beforeunload", closeMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("beforeunload", closeMenu);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="text-lg max-w-screen flex flex-wrap items-center justify-between mx-auto relative">
        {/* LOGO AND TEA JOY TEXT */}
        <Link href="/" className="flex items-center gap-2">
          {isDark ? (
            <Image
              src={logo2}
              alt="logo"
              width={48}
              height={48}
              className="object-contain"
            />
          ) : (
            <Image
              src={logo}
              alt="logo"
              width={48}
              height={48}
              className="object-contain"
            />
          )}
          <span className="hidden md:inline text-2xl font-medium text-neutral-700 dark:text-orange-50 hover:text-stone-600 dark:hover:text-neutral-300 translate-y-1">
            Tea Joy
          </span>
        </Link>

        {/* Mobile centered title - fixed position */}
        <div className="md:hidden fixed left-1/2 transform -translate-x-1/2 pointer-events-none translate-y-1" style={{top: 'var(--header-top, 1.5rem)'}}>
          <Link href="/" className="text-2xl font-medium text-neutral-700 dark:text-orange-50 pointer-events-auto">
            Tea Joy
          </Link>
        </div>

        <button
          ref={buttonRef}
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-12 h-12 justify-center text-sm text-neutral-800 dark:text-neutral-50
            rounded-xl md:hidden focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:bg-neutral-50
            focus:bg-opacity-40"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <svg
            className={` w-5 h-5 ${
              isMenuOpen ? " text-neutral-800 dark:text-neutral-50" : ""
            }`}
            aria-hidden="true"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {/* MENU TITLES */}
        <div
          ref={menuRef}
          className={`w-full md:w-auto ${
            isMenuOpen ? "block" : "hidden md:block"
          }`}
          id="navbar-default"
        >
          <ul
            className="flex flex-col p-3 md:p-0 mt-3 md:flex-row md:space-y-0 space-y-2
          lg:space-x-8 md:space-x-4 items-center dark:text-orange-50 bg-neutral-100 dark:bg-neutral-800 md:bg-transparent md:dark:bg-transparent rounded-lg md:rounded-none"
          >
            {/* THEME AND LANGUAGE SWITCHERS (Mobile: horizontal at bottom, Desktop: normal) */}
            <div className="flex flex-row gap-4 items-center md:contents order-last md:order-none mt-3 md:mt-0">
              {/* LANGUAGE */}
              <div className="language-dropdown flex items-center md:order-1 md:mb-0.5">
                <div className="selected-language flex items-center" onClick={toggleDropdown}>
                  <img
                    src={flag}
                    alt={language}
                    className="flag w-6 h-4 cursor-pointer object-contain"
                  />
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-options absolute mt-2 border-[1px] rounded-lg border-neutral-400 dark:border-neutral-600 bg-orange-50 dark:bg-neutral-800 p-1 z-50 flex flex-col gap-1">
                    <div
                      className={`option hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-md cursor-pointer ${language === "en" ? "selected" : ""}`}
                      onClick={() => handleLanguageChange("en")}
                    >
                      <img
                        src={
                          "https://res.cloudinary.com/dov6nv91n/image/upload/v1725046378/uotz4byg4gmnrvd2dc8n.jpg"
                        }
                        alt="en"
                        className="flag w-8 h-5 object-cover select-none rounded-sm"
                      />
                    </div>
                    <div
                      className={`option hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-md cursor-pointer ${language === "ru" ? "selected" : ""}`}
                      onClick={() => handleLanguageChange("ru")}
                    >
                      <img
                        src="https://res.cloudinary.com/dov6nv91n/image/upload/v1725046413/hyt7twgjvsphu8n8ttkj.jpg"
                        alt="ru"
                        className="flag w-8 h-5 object-cover select-none rounded-sm"
                      />
                    </div>
                    <div
                      className={`option hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-md cursor-pointer ${language === "th" ? "selected" : ""}`}
                      onClick={() => handleLanguageChange("th")}
                    >
                      <img
                        src="https://res.cloudinary.com/dov6nv91n/image/upload/v1725045522/wk7bqinl964ctegvdl8x.png"
                        alt="th"
                        className="flag w-8 h-5 object-cover select-none rounded-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* DARK MODE */}
              <div className="md:order-7 md:ml-4">
                {isDark ? (
                  <HiSun
                    alt="Sun"
                    onClick={handleModeClick}
                    className="w-6 h-6 cursor-pointer text-orange-50"
                  />
                ) : (
                  <HiMoon
                    alt="Moon"
                    onClick={handleModeClick}
                    className="w-6 h-6 cursor-pointer text-neutral-700"
                  />
                )}
              </div>
            </div>
            <div className="md:order-3 order-1">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="block py-1 px-3 md:border-0 md:p-0 hover:text-stone-600 dark:hover:text-neutral-300"
              >
                {text.home}
              </Link>
            </div>
            <div className="md:border-0 md:p-0 hover:text-stone-600 dark:hover:text-neutral-300 md:order-4 order-2">
              <Link
                href="/policy"
                onClick={() => setIsMenuOpen(false)}
                className="py-1 px-3 md:p-0 hover:text-stone-600 dark:hover:text-neutral-300 flex flex-row gap-1"
              >
                {text.threeF}
                <Image src={leaf} alt="Leaf" className="w-6 h-6" />
              </Link>
              <hr className="border-1 border-lime-900 dark:border-lime-200 md:border-0 mt-1" />
            </div>
            <div className="md:order-5 order-3">
              <Link
                href="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="block py-1 px-3 md:border-0 md:p-0 hover:text-stone-600 dark:hover:text-neutral-300"
              >
                {text.shop}
              </Link>
              <hr className="border-1 border-lime-900 dark:border-lime-200 md:border-0 mt-1" />
            </div>
            <div className="md:order-6 order-4">
              {isCartEmpty ? (
                <Link
                  href="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-1 px-3 md:border-0 md:p-0 hover:text-stone-600 dark:hover:text-neutral-300"
                >
                  {isDark ? (
                    <Image src={cartIcon2} alt="Cart" className="w-6 h-6" />
                  ) : (
                    <Image src={cartIcon} alt="Cart" className="w-6 h-6" />
                  )}
                </Link>
              ) : (
                <Link
                  href="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="relative block py-1 px-3 md:border-0 md:p-0 hover:text-stone-600 dark:hover:text-neutral-300"
                >
                  <div className="relative inline-block">
                    {isDark ? (
                      <Image src={cartIcon2} alt="Cart" className="w-6 h-6" />
                    ) : (
                      <Image src={cartIcon} alt="Cart" className="w-6 h-6" />
                    )}
                    <div
                      id="cart-circle"
                      className="absolute top-3 right-2 text-black w-4 h-4 rounded-full flex items-center justify-center text-xs"
                    >
                      {cart.length}
                    </div>
                  </div>
                </Link>
              )}
              <hr className="border-1 border-lime-900 dark:border-lime-200 md:border-0 mt-1" />
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
