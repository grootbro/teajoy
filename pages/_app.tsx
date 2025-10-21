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
        <title>TeaJoy - Premium Tea Shop Thailand</title>
        <meta name="description" content="Discover premium quality tea from around the world. Fair trade, fresh blends, and exceptional taste. Free shipping in Thailand over 1000฿." />
        <meta property="og:title" content="TeaJoy - Premium Tea Shop Thailand" />
        <meta property="og:description" content="The finest quality tea from across the globe. Expert blending and a remarkable tasting experience." />
        <meta property="og:image" content="https://res.cloudinary.com/dov6nv91n/image/upload/v1725063333/cougsirqq9yhcqog2jel.png"/>
      </Head>
      <main className={`flex flex-col min-h-screen ${spartan.className}`}>
        <CartProvider>
          <LanguageProvider>
            <div className="sticky top-0 z-50 md:px-24 px-10 py-2 backdrop-blur-md bg-stone-50/90 dark:bg-stone-800/90 border-b border-stone-200/50 dark:border-stone-700/50">
              <Navbar {...pageProps} />
            </div>
            <div className="md:px-24 px-10 pt-4 pb-20 flex-1" id="app-bg">
              <Component {...pageProps} />
            </div>
          </LanguageProvider>
        </CartProvider>
        <Footer />
      </main>
    </>
  );
}
