"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icon } from "@iconify/react";
import { useCart } from "@/context/CartContext";
import { MedicineService } from "@/lib/medicine/actions";
import { Medicine } from "@/types";
import Button from "@/components/Button";

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
            <div className="mb-12 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-6 text-black tracking-tight">Find Your Medicine</h1>
                <div className="relative w-full max-w-xl">
                    <Icon icon="lucide:search" className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                        type="text"
                        placeholder="Search for medicines..."
                        className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white shadow-sm text-black placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 flex flex-col items-center gap-2">
                    <Icon icon="eos-icons:loading" className="text-4xl text-black animate-spin" />
                    <p className="text-gray-500">Searching medicines...</p>
                </div>
            ) : medicines.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {medicines.map((medicine) => (
                        <div key={medicine._id} className="bg-white rounded-2xl p-4 flex flex-col transition-transform hover:-translate-y-1 duration-300 border border-transparent hover:border-black/5">
                            <div className="relative h-56 w-full rounded-xl bg-gray-50 mb-4 overflow-hidden flex items-center justify-center p-6">
                                {/* Wishlist Button */}
                                <button
                                    onClick={() => addToWishlist({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                                    className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-colors ${isInWishlist(medicine._id) ? 'text-black' : 'text-gray-300 hover:text-black'}`}
                                >
                                    <Icon icon={isInWishlist(medicine._id) ? "solar:heart-bold" : "solar:heart-linear"} className="text-xl" />
                                </button>
                                {medicine.image ? (
                                    <img src={medicine.image.url} alt={medicine.name} className="h-full w-full object-contain mix-blend-multiply" />
                                ) : (
                                    <Icon icon="medical-icon:i-medicines" className="text-6xl text-gray-200" />
                                )}
                            </div>

                            <div className="space-y-1 flex-grow">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{medicine.category || "General"}</p>
                                <h3 className="text-lg font-bold text-black line-clamp-1">{medicine.name}</h3>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">{medicine.company}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 mt-2">
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-sm font-medium text-gray-500">$</span>
                                    <span className="text-2xl font-bold text-black">{medicine.price}</span>
                                </div>
                                <button
                                    onClick={() => addToCart({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                                    className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-bold"
                                >
                                    <Icon icon="solar:cart-plus-linear" className="text-lg" /> Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl">
                    <Icon icon="fluent:box-search-24-regular" className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-black">No medicines found</h3>
                    <p className="text-gray-500">Try adjusting your search terms</p>
                </div>
            )}
        </div>
    );
}

export default function MedicinePage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <Header />
            <main className="flex-1">
                <Suspense fallback={<div className="text-center p-10 text-gray-500">Loading Search...</div>}>
                    <SearchableMedicineList />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
