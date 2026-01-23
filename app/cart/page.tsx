"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function CartPage() {
    const { cart, removeFromCart } = useCart();

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white flex items-center gap-3">
                    <Icon icon="lucide:shopping-cart" /> Shopping Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl dark:bg-gray-900/50">
                        <Icon icon="lucide:shopping-bag" className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your cart is empty</h2>
                        <Link href="/medicine" className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item, index) => (
                                <div key={`${item._id}-${index}`} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="h-24 w-24 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center p-2">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                                        ) : (
                                            <Icon icon="medical-icon:i-medicines" className="text-4xl text-gray-300" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                        <p className="text-lg font-bold text-primary mt-2">${item.price}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors self-start"
                                    >
                                        <Icon icon="lucide:trash-2" className="text-xl" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="h-fit bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h3>
                            <div className="space-y-2 mb-6 text-gray-600 dark:text-gray-300">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (5%)</span>
                                    <span>${(total * 0.05).toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 font-bold text-lg text-gray-900 dark:text-white flex justify-between">
                                    <span>Total</span>
                                    <span>${(total * 1.05).toFixed(2)}</span>
                                </div>
                            </div>
                            <Link
                                href="/checkout"
                                className="block w-full text-center py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg shadow-primary/30"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
