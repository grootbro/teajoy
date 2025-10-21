import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import confirm from "@/public/assets/images/confirm.png";
import { BsArrowLeft } from "react-icons/bs";
import Image from "next/image";
import { CartContext } from "@/app/contexts/CartContext";
import Spinner from "@/app/components/Spinner";
import { LanguageContext } from "@/app/contexts/LanguageContext";

export default function Checkout() {
  const { text } = useContext(LanguageContext);
  const [showCheckout, setShowCheckout] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>("");
  const [eMail, setEMail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [fullNameError, setFullNameError] = useState("");
  const [eMailError, setEMailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const cartContext = useContext(CartContext);
  const cart = cartContext?.cart || [];
  const clearCart = cartContext?.clearCart || (() => {});

  // Calculate total amount
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  // INPUT VALIDATION AND ORDER SUBMISSION
  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    let hasError = false;

    if (fullName === "" || fullName.length < 2) {
      setFullNameError(text.fullNameRequired);
      hasError = true;
    }

    // Email validation
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (eMail === "") {
      setEMailError(text.eMailRequired);
      hasError = true;
    } else if (!emailRegex.test(eMail)) {
      setEMailError("Please enter a valid email address");
      hasError = true;
    }

    if (address === "" || address.length < 5) {
      setAddressError(text.addressRequired);
      hasError = true;
    }

    // Phone validation - international format with country code
    const phoneDigits = phoneNumber.replace(/\D/g, '');
    if (phoneNumber === "") {
      setPhoneNumberError(text.numberRequired);
      hasError = true;
    } else if (!phoneNumber.startsWith('+')) {
      setPhoneNumberError("Phone number must start with +");
      hasError = true;
    } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setPhoneNumberError("Please enter a valid international phone number (10-15 digits)");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const orderData = {
        fullName,
        email: eMail,
        address,
        phoneNumber,
        products: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          gr: item.gr
        })),
        totalAmount: calculateTotal()
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        setShowCheckout(false);
        clearCart();
      } else {
        console.error('Order creation failed:', result.error);
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleFullNameChange = (e: any) => {
    setFullName(e.target.value);
    setFullNameError("");
  };

  const handleEMailChange = (e: any) => {
    setEMail(e.target.value);
    setEMailError("");
  };

  const handleAddressChange = (e: any) => {
    setAddress(e.target.value);
    setAddressError("");
  };

  const handlePhoneNumberChange = (e: any) => {
    let value = e.target.value;

    // Allow only digits and plus sign
    value = value.replace(/[^\d+]/g, '');

    // Auto-add + at the beginning if not present and user starts typing
    if (value.length > 0 && !value.startsWith('+')) {
      value = '+' + value;
    }

    // Ensure only one + at the beginning
    if (value.split('+').length > 2) {
      value = '+' + value.replace(/\+/g, '');
    }

    setPhoneNumber(value);
    setPhoneNumberError("");
  };

  useEffect(() => {
    if (
      fullName !== "" &&
      eMail !== "" &&
      address !== "" &&
      phoneNumber !== ""
    ) {
      setShowCheckout(true);
    }
  }, [fullName, eMail, address, phoneNumber]);

  return (
    <div className="text-lg dark:text-orange-50 pb-10">
      {showCheckout ? (
        <form onSubmit={handleClick} className="flex flex-col gap-6 items-center mx-auto mt-10">
          <div className="text-xl">
            <p>{text.checkoutTitle}</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relevant">
              <p className="ml-1">{text.fullName}</p>
              <input
                placeholder={text.fullName}
                className="w-72 md:w-96 h-9 px-2 border-[1px] border-neutral-400 rounded-md shadow-md dark:text-neutral-900"
                onChange={handleFullNameChange}
                required
                minLength={2}
              ></input>
              {fullNameError && (
                <p className="text-sm text-red-500 dark:text-orange-400 absolute pl-1">
                  {fullNameError}
                </p>
              )}
            </div>
            <div className="relevant">
              <p className="ml-1">{text.eMail}</p>
              <input
                type="email"
                placeholder={text.eMail}
                className="w-72 md:w-96  h-9 px-2 border-[1px] border-neutral-400 rounded-md shadow-md dark:text-neutral-900"
                onChange={handleEMailChange}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address"
              ></input>
              {eMailError && (
                <p className="text-sm text-red-500 dark:text-orange-400 absolute pl-1">
                  {eMailError}
                </p>
              )}
            </div>
            <div className="relevant">
              <p className="ml-1">{text.shippingAddress}</p>
              <input
                placeholder={text.shippingAddress}
                className="w-72 md:w-96  h-9 px-2 border-[1px] border-neutral-400 rounded-md shadow-md dark:text-neutral-900"
                onChange={handleAddressChange}
                required
                minLength={5}
              ></input>
              {addressError && (
                <p className="text-sm text-red-500 dark:text-orange-400 absolute pl-1">
                  {addressError}
                </p>
              )}
            </div>
            <div className="relevant">
              <p className="ml-1">{text.phoneNumber}</p>
              <input
                type="tel"
                placeholder="+1234567890"
                value={phoneNumber}
                className="w-72 md:w-96  h-9 px-2 border-[1px] border-neutral-400 rounded-md shadow-md dark:text-neutral-900"
                onChange={handlePhoneNumberChange}
                required
                maxLength={16}
                inputMode="numeric"
                title="Please enter a valid international phone number with country code"
              ></input>
              {phoneNumberError && (
                <p className="text-sm text-red-500 dark:text-orange-400 absolute pl-1">
                  {phoneNumberError}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            id="main-button"
            className="text-black border-[1px] border-neutral-700 rounded-xl items-center bg-neutral-50 dark:bg-neutral-300 px-10
              py-2 shadow-md hover:bg-green-100 transition-colors duration-300 text-xl active:text-neutral-400 mt-5 cursor-pointer"
          >
            {text.placeOrderButton}
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center mx-auto mt-10">
          <Spinner />
          <div>
            <Image src={confirm} alt="Confirmation" className="w-10 h-10" />
          </div>
          <div className="text-2xl mt-10 text-center ">
            <p>
              {text.textPart1} {""}
              <span id="name-text">{fullName}</span>. {text.textPart2}
            </p>
          </div>
          <div className="flex items-center justify-center mt-10 gap-2 dark:text-orange-50">
            <Link href="/shop" className="inline-block">
              <BsArrowLeft
                alt="Left Arrow"
                className="w-5 h-5 mb-1 inline-block"
              />
            </Link>
            <Link
              href="/"
              className="inline-block active:text-neutral-400 transition-colors duration-300"
            >
              <p className="inline-block text-lg">{text.backToHome}</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
