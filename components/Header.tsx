"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

export default function Header() {
    const { user, logout, isAuthenticated } = useAuth();
    const { cart, wishlist } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-black/80"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2.5 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                        <Icon icon="fluent:doctor-24-filled" className="text-2xl text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 tracking-tight">
                        Med-Ease
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    {[
                        { name: "Medicine", href: "/medicine" },
                        { name: "Nurses", href: "/nurses" },
                        { name: "Blood", href: "/blood" },
                        { name: "Doctors", href: "/doctors" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-gray-600 font-medium hover:text-blue-600 transition-colors text-sm uppercase tracking-wide dark:text-gray-300 dark:hover:text-blue-400"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-5">
                    <Link href="/cart" className="relative group">
                        <div className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <Icon icon="lucide:shopping-cart" className="text-xl text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 h-5 w-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-black">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    <Link href="/wishlist" className="relative group">
                        <div className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <Icon icon="lucide:heart" className="text-xl text-gray-700 dark:text-gray-300 group-hover:text-rose-500 transition-colors" />
                        </div>
                        {wishlist.length > 0 && (
                            <span className="absolute top-0 right-0 h-5 w-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-black">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>

                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 ml-2 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-cyan-100 flex items-center justify-center">
                                    <Icon icon="carbon:user-avatar-filled-alt" className="text-xl text-blue-600" />
                                </div>
                                <span className="text-sm font-semibold hidden md:block dark:text-white">{user.name}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="text-xs text-red-500 hover:text-red-700 font-medium uppercase tracking-wider ml-2"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-black/10 active:scale-95 transform"
                        >
                            Login
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Icon icon={isMenuOpen ? "lucide:x" : "lucide:menu"} className="text-2xl text-gray-700 dark:text-gray-300" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md dark:bg-black/95 dark:border-gray-800 p-6 absolute w-full shadow-2xl">
                    <nav className="flex flex-col gap-6">
                        {[
                            { name: "Medicine", href: "/medicine" },
                            { name: "Nurses", href: "/nurses" },
                            { name: "Blood", href: "/blood" },
                            { name: "Doctors", href: "/doctors" },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-lg font-medium text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
