import "tailwindcss/tailwind.css";
import "@/app/globals.css";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { CartProvider } from "@/app/contexts/CartContext";
import { League_Spartan } from "next/font/google";
import Head from "next/head";
import { LanguageProvider } from "@/app/contexts/LanguageContext";

const spartan = League_Spartan({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <title>weedjam 🍯</title>
        <meta name="description" content="weedjam co · Weed · Food · Joints · Bongs · Chill · Smoke tools · Jam · Peoples · Vibe" />
        <meta property="og:image" content="https://res.cloudinary.com/dov6nv91n/image/upload/v1725063333/cougsirqq9yhcqog2jel.png"/>
      </Head>
      <main className={`flex flex-col min-h-screen ${spartan.className}`}>
        <CartProvider>
          <LanguageProvider>
            <div className="md:px-24 px-10 pt-5 pb-20" id="app-bg">
              <Navbar {...pageProps} />
              <Component {...pageProps} />
            </div>
          </LanguageProvider>
        </CartProvider>
        <Footer />
      </main>
    </>
  );
}
