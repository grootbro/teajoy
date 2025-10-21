import Image from "next/image";
import logo from "@/public/assets/images/joytea.webp";
import "tailwindcss/tailwind.css";
import {
  TbWorld,
  TbMail,
  TbBrandTelegram,
  TbBrandInstagram,
} from "react-icons/tb";

export default function Footer() {
  return (
    <div
      className="px-12 md:px-24 flex flex-col gap-8 md:gap-0 md:flex-row align-middle items-center
      mb-0 mt-auto top-auto w-full
       bg-stone-700 py-10 sticky text-stone-50"
    >
      <div className="flex-col text-center md:text-left">
        <Image src={logo} alt="logo" className="flex h-18 w-16 mb-1 mx-auto md:mx-0 md:ml-6 justify-center items-center" />
        <p className="mx-auto md:pl-1 md:ml-4">choose you</p>
        <p className="mx-auto md:pl-1 md:ml-4">favorite tea</p>
      </div>

      <div className="flex mx-auto text-lg pr-3 gap-8">
        {/* <div>
          <a target="_blank" href="https://TeaJoy.store/">
            <TbWorld className="cursor-pointer w-7 h-7" id="footer-icon" />
          </a>
        </div> */}
        <div>
          <a target="_blank" href="mailto:love@teajoy.shop">
            <TbMail className="cursor-pointer w-7 h-7" id="footer-icon" />
          </a>
        </div>
        <div>
          <a target="_blank" href="https://t.me/teajoyshop">
            <TbBrandTelegram
              className="cursor-pointer w-7 h-7"
              id="footer-icon"
            />
          </a>
        </div>
        <div>
          <a
            target="_blank"
            href="https://www.instagram.com/TeaJoy.co"
          >
            <TbBrandInstagram
              className="cursor-pointer w-7 h-7"
              id="footer-icon"
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <p className="italic">made with</p>
        <a
          target="_blank"
          href="https://teajoy.shop/"
          className="text-purple-300 hover:text-neutral-50"
        >
          🧡 + 🪴
        </a>
      </div>
    </div>
  );
}
