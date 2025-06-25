"use client";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

export default function ClientLayout({ children }) {
    const [showCart, setShowCart] = useState(false);

    return (
        <>
            <Navbar show={showCart} setShow={setShowCart} />
            {children}
            <Footer />
        </>
    );
}