// import Image from "next/image";
//
// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>
//
//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import ShuffleHero from "@/components/Home/ShuffleHero";
import {HeroScrollDemo} from "@/components/Home/HeroScrollDemo";
import HeroSlideshow from "@/components/Home/HeroSlideShow";

export default function HomePage() {
  const [showCart, setShowCart] = useState(false);

  return (
      <main className="min-h-screen bg-gray-100 ">
        {/*<Navbar show={showCart} setShow={setShowCart} />*/}
          <HeroSlideshow />
        <ShuffleHero />
          <HeroScrollDemo />

        {/*<div className="container mx-auto px-4 py-8">*/}
        {/*  <h1 className="text-4xl font-bold text-center text-pink mb-8">*/}
        {/*    Welcome to Tilottama By Archana*/}
        {/*  </h1>*/}

        {/*  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">*/}
        {/*    /!* Your content here *!/*/}
        {/*    <div className="bg-white p-6 rounded-lg shadow-md">*/}
        {/*      <h2 className="text-xl font-semibold mb-4 text-primary-700">Featured Products</h2>*/}
        {/*      <p className="text-gray-600">Discover our latest collection of premium fashion items.</p>*/}
        {/*    </div>*/}

        {/*    <div className="bg-lightpink p-6 rounded-lg shadow-md">*/}
        {/*      <h2 className="text-xl font-semibold mb-4 text-primary-800">Special Offers</h2>*/}
        {/*      <p className="text-gray-700">Don't miss out on our exclusive deals and discounts.</p>*/}
        {/*    </div>*/}

        {/*    <div className="bg-secondary-100 p-6 rounded-lg shadow-md">*/}
        {/*      <h2 className="text-xl font-semibold mb-4 text-secondary-800">About Us</h2>*/}
        {/*      <p className="text-gray-700">Learn more about our brand and commitment to quality.</p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<Footer />*/}
      </main>
  );
}