"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icon } from "@iconify/react";
import { useCart } from "@/context/CartContext";
import { MedicineService } from "@/lib/api/services";
import { Medicine } from "@/types";

function SearchableMedicineList() {
    const searchParams = useSearchParams();
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { addToCart, addToWishlist, isInWishlist } = useCart();

    useEffect(() => {
        const fetchMedicines = async () => {
            setLoading(true);
            try {
                const query = searchTerm ? `?search=${searchTerm}` : '';
                const data = await MedicineService.getAll(query);
                setMedicines(data);
            } catch (error) {
                console.error("Failed to fetch medicines", error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchMedicines();
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Find Your Medicine</h1>
                <div className="relative w-full max-w-xl">
                    <Icon icon="lucide:search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                        type="text"
                        placeholder="Search for medicines..."
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm dark:bg-gray-800 dark:border-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 flex flex-col items-center gap-2">
                    <Icon icon="eos-icons:loading" className="text-4xl text-primary animate-spin" />
                    <p>Searching medicines...</p>
                </div>
            ) : medicines.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {medicines.map((medicine) => (
                        <div key={medicine._id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow group relative flex flex-col">
                            <div className="relative h-48 w-full rounded-xl bg-gray-50 dark:bg-gray-700 mb-4 overflow-hidden flex items-center justify-center">
                                {/* Wishlist Button */}
                                <button
                                    onClick={() => addToWishlist({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md z-10 transition-colors ${isInWishlist(medicine._id) ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-500 hover:text-red-500'}`}
                                >
                                    <Icon icon={isInWishlist(medicine._id) ? "lucide:heart-crack" : "lucide:heart"} />
                                </button>
                                {medicine.image ? (
                                    <img src={medicine.image.url} alt={medicine.name} className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                                ) : (
                                    <Icon icon="medical-icon:i-medicines" className="text-6xl text-gray-300" />
                                )}
                            </div>

                            <div className="space-y-2 flex-grow">
                                <p className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded w-fit">{medicine.category || "General"}</p>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{medicine.name}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">{medicine.company}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 mt-2 border-t border-dashed border-gray-200 dark:border-gray-700">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">${medicine.price}</span>
                                <button
                                    onClick={() => addToCart({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                                    className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm font-medium"
                                >
                                    <Icon icon="lucide:shopping-cart" /> Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl dark:bg-gray-900/50">
                    <Icon icon="fluent:box-search-24-regular" className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No medicines found</h3>
                    <p className="text-gray-500">Try adjusting your search terms</p>
                </div>
            )}
        </div>
    );
}

export default function MedicinePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-gray-50/50 dark:bg-black/20">
                <Suspense fallback={<div className="text-center p-10">Loading Search...</div>}>
                    <SearchableMedicineList />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
