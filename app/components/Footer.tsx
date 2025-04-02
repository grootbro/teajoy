import Image from "next/image";
import logo from "@/public/assets/images/logo002.png";
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
      <div className="flex-col">
        <Image src={logo} alt="logo" className="h-6 w-24 mb-1" />
        <p className="ml-4 mx-auto md:pl-1">choose you</p>
        <p className="ml-4 mx-auto md:pl-1">favorite strain</p>
      </div>

      <div className="flex mx-auto text-lg pr-3 gap-8">
        {/* <div>
          <a target="_blank" href="https://weedjam.store/">
            <TbWorld className="cursor-pointer w-7 h-7" id="footer-icon" />
          </a>
        </div> */}
        <div>
          <a target="_blank" href="mailto:love@weedjam.store">
            <TbMail className="cursor-pointer w-7 h-7" id="footer-icon" />
          </a>
        </div>
        <div>
          <a target="_blank" href="https://t.me/weedjam">
            <TbBrandTelegram
              className="cursor-pointer w-7 h-7"
              id="footer-icon"
            />
          </a>
        </div>
        <div>
          <a
            target="_blank"
            href="https://www.instagram.com/weedjam.co"
          >
            <TbBrandInstagram
              className="cursor-pointer w-7 h-7"
              id="footer-icon"
            />
          </a>
        </div>
      </div>
      <div>
        <p className="italic">made with</p>
        <a
          target="_blank"
          href="https://weedjam.store/"
          className="text ml-2 text-purple-300 hover:text-neutral-50"
        >
          🧡 + 🪴
        </a>
      </div>
    </div>
  );
}
