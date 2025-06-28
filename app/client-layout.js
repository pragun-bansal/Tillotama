"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from '@/components/Cart';

export default function ClientLayout({ children }) {
    const [showCart, setShowCart] = useState(false);
    const pathname = usePathname();

    // Check if current route is home page
    const isHomePage = pathname === "/";

    return (
        <>
            <Navbar show={showCart} setShow={setShowCart} />
            <Cart show={showCart} setShow={setShowCart} />
            <main className={isHomePage ? "" : "mt-27 md:mt-32"}>
                {children}
            </main>
            <Footer />
        </>
    );
}