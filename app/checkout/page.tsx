"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/guards/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Icon } from "@iconify/react";

export default function CheckoutPage() {
    const { user } = useAuth();
    const { cart } = useCart();

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <AuthGuard>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white flex items-center gap-3">
                    <Icon icon="lucide:check-circle" className="text-green-500" /> Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* User Details */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Icon icon="lucide:user" /> Shipping Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <input type="text" value={user?.name || ""} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <input type="email" value={user?.email || ""} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                                    <input type="tel" value={user?.phone || ""} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                                    <textarea rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600" placeholder="123 Medical Avenue, NY"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary & Confirm */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Icon icon="lucide:package" /> Order Summary
                            </h3>
                            <ul className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                                {cart.map((item, idx) => (
                                    <li key={`${item._id}-${idx}`} className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                                        <span className="font-medium">${item.price}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${(total * 1.05).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                className="w-full mt-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                                onClick={() => alert("Order Placed Successfully! (Simulation)")}
                            >
                                Confirm Checkout <Icon icon="lucide:check" />
                            </button>
                        </div>
                    </div>
                </div>
                </main>
                <Footer />
            </div>
        </AuthGuard>
    );
}
