"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { MedicineService } from "@/lib/medicine/actions";
import { Medicine } from "@/types";
import GridSwitcher from "@/components/shared/GridSwitcher";
import { ListSkeleton } from "@/components/shared/Skeleton";
import PageHero from "@/components/shared/PageHero";
import ListingHeader from "@/components/shared/ListingHeader";
import ItemCard from "@/components/shared/ItemCard";

function SearchableMedicineList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const nameParam = searchParams.get("name") || "";
    const pageParam = Number(searchParams.get("page")) || 1;
    const limitParam = Number(searchParams.get("limit")) || 10;
    const initialSearch = nameParam || searchParams.get("search") || "";

    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [columns, setColumns] = useState(4);
    const { addToCart, addToWishlist, isInWishlist } = useCart();

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm) {
                params.set("name", searchTerm);
            } else {
                params.delete("name");
            }
            router.push(`?${params.toString()}`, { scroll: false });
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, router, searchParams]);

    useEffect(() => {
        const fetchMedicines = async () => {
            setLoading(true);
            try {
                const data = await MedicineService.getAll({
                    search: nameParam,
                    page: pageParam,
                    limit: limitParam
                });
                setMedicines(data);
            } catch (error) {
                console.error("Failed to fetch medicines", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, [nameParam, pageParam, limitParam]);

    const getGridColsClass = () => {
        switch (columns) {
            case 1: return "grid-cols-1";
            case 2: return "grid-cols-1 sm:grid-cols-2";
            case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
            case 4: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
            default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
        }
    };

    return (
        <div className="pb-20">
            <PageHero
                title="Your Health, Our Priority"
                description="Browse through our extensive collection of high-quality medicines from trusted global manufacturers."
                image="/images/medicine-hero.png"
                icon="solar:medical-kit-bold"
            />

            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <div className="relative w-full max-w-2xl mx-auto -mt-24 z-20">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 -m-4" />
                        <div className="relative">
                            <Icon icon="lucide:search" className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                placeholder="Search for medicines..."
                                className="w-full pl-14 pr-6 py-5 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-black transition-all bg-white shadow-xl text-black placeholder:text-gray-400 text-lg font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <ListingHeader
                        title={`${medicines.length} Medicines Available`}
                        subtitle="Catalogue"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider hidden sm:block">View:</span>
                            <GridSwitcher currentColumns={columns} onChange={setColumns} />
                        </div>
                    </ListingHeader>
                </div>

                {loading ? (
                    <ListSkeleton columns={columns} />
                ) : medicines.length > 0 ? (
                    <div className={`grid ${getGridColsClass()} gap-8 transition-all duration-500`}>
                        {medicines.map((medicine) => (
                            <ItemCard
                                key={medicine._id}
                                id={medicine._id}
                                title={medicine.name}
                                subtitle={medicine.company}
                                tag={medicine.category}
                                image={medicine.image?.url}
                                placeholderIcon="solar:medical-kit-linear"
                                href={`/medicine/${medicine._id}`}
                                price={medicine.price}
                                priceUnit=""
                                horizontal={columns === 1}
                                description={medicine.description}
                                topAction={
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            addToWishlist({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' });
                                        }}
                                        className={`p-2 rounded-full transition-colors bg-white/80 backdrop-blur-sm ${isInWishlist(medicine._id) ? 'text-black' : 'text-gray-300 hover:text-black'}`}
                                    >
                                        <Icon icon={isInWishlist(medicine._id) ? "solar:heart-bold" : "solar:heart-linear"} className="text-xl" />
                                    </button>
                                }
                                footerAction={
                                    <button
                                        onClick={() => addToCart({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                                        className={`${columns === 1 ? 'px-8 py-3' : 'px-6 py-2'} rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-bold shadow-lg shadow-black/10`}
                                    >
                                        <Icon icon="solar:cart-plus-linear" className="text-lg" /> Add to Cart
                                    </button>
                                }
                            />
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
        </div>
    );
}

export default function MedicinePage() {
    return (
        <Suspense fallback={<div className="text-center p-10 text-gray-500">Loading Search...</div>}>
            <SearchableMedicineList />
        </Suspense>
    );
}
