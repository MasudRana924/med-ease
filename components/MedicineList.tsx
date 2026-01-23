"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Medicine } from "@/types";

interface MedicineListProps {
    medicines: Medicine[];
}

export default function MedicineList({ medicines }: MedicineListProps) {
    const { addToCart, addToWishlist, isInCart, isInWishlist } = useCart();

    if (!medicines || medicines.length === 0) return null;

    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-end justify-between mb-12">
                    <div className="space-y-1">
                        <span className="text-blue-500 font-bold tracking-widest text-xs uppercase pl-1">Online Pharmacy</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Featured Medicines</h2>
                    </div>
                    <Link
                        href="/medicine"
                        className="hidden md:flex items-center gap-2 text-gray-900 dark:text-white font-semibold hover:text-blue-500 transition-colors group"
                    >
                        Browse Store <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {medicines.map((medicine) => (
                        <div key={medicine._id} className="group bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] p-4 transition-all duration-500 hover:bg-white dark:hover:bg-gray-800 hover:shadow-2xl hover:shadow-blue-500/5 border border-transparent hover:border-blue-100 dark:hover:border-gray-700 relative overflow-hidden">

                            {/* Wishlist */}
                            <button
                                onClick={() => addToWishlist({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                                className={`absolute top-6 right-6 z-20 h-10 w-10 flex items-center justify-center rounded-2xl transition-all duration-300 ${isInWishlist(medicine._id) ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'bg-white/90 dark:bg-gray-800/90 text-gray-400 hover:text-rose-500 hover:bg-white shadow-sm backdrop-blur-sm'}`}
                            >
                                <Icon icon={isInWishlist(medicine._id) ? "solar:heart-bold" : "solar:heart-linear"} className="text-xl" />
                            </button>

                            <div className="relative h-[260px] w-full rounded-[2rem] bg-white dark:bg-gray-800/80 mb-6 flex items-center justify-center p-8 shadow-sm group-hover:shadow-inner transition-shadow duration-500">
                                {/* Badge */}
                                {medicine.type && (
                                    <div className="absolute top-4 left-4 bg-gray-900/5 dark:bg-white/10 backdrop-blur-md text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        {medicine.type}
                                    </div>
                                )}

                                {medicine.image ? (
                                    <img src={medicine.image.url} alt={medicine.name} className="h-full w-full object-contain transition-all duration-700 ease-in-out" />
                                ) : (
                                    <Icon icon="solar:medical-kit-linear" className="text-8xl text-gray-200 dark:text-gray-700" />
                                )}
                            </div>

                            <div className="px-2 pb-2 space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate leading-tight group-hover:text-blue-600 transition-colors">{medicine.name}</h3>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{medicine.company}</p>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">Price</span>
                                        <div className="flex items-baseline gap-0.5">
                                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">$</span>
                                            <span className="text-2xl font-black text-gray-900 dark:text-white">{medicine.price}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => addToCart({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                                        disabled={isInCart(medicine._id)}
                                        className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${isInCart(medicine._id)
                                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                                            : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white shadow-xl hover:shadow-blue-500/25 active:scale-95'
                                            }`}
                                    >
                                        <Icon icon={isInCart(medicine._id) ? "solar:check-circle-linear" : "solar:cart-large-2-linear"} className="text-2xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center md:hidden">
                    <Link
                        href="/medicine"
                        className="inline-flex items-center gap-2 text-gray-900 dark:text-white font-semibold"
                    >
                        Browse Store <Icon icon="solar:arrow-right-linear" />
                    </Link>
                </div>

            </div>
        </section>
    );
}
