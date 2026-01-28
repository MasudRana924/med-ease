"use client";

import { Icon } from "@iconify/react";
import { useCart } from "@/context/CartContext";
import { Medicine } from "@/types";
import { Section } from "@/components/ui";
import ListingHeader from "@/components/shared/ListingHeader";
import ItemCard from "@/components/shared/ItemCard";
import { ListSkeleton } from "@/components/shared/Skeleton";

interface MedicineListProps {
    medicines: Medicine[];
    title?: string;
    subtitle?: string;
    viewAllLink?: string;
    loading?: boolean;
}

export default function MedicineList({
    medicines,
    title = "Featured Medicines",
    subtitle = "Online Pharmacy",
    viewAllLink = "/medicine",
    loading = false
}: MedicineListProps) {
    const { addToCart, addToWishlist, isInWishlist } = useCart();

    if (loading) {
        return (
            <Section>
                <ListingHeader title={title} subtitle={subtitle} />
                <ListSkeleton count={4} />
            </Section>
        );
    }

    if (!medicines || medicines.length === 0) return null;

    const listContent = (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {medicines.map((medicine) => (
                <ItemCard
                    key={medicine._id}
                    id={medicine._id}
                    title={medicine.name}
                    subtitle={medicine.company}
                    tag={medicine.category || "General"}
                    image={medicine.image?.url}
                    placeholderIcon="solar:medical-kit-linear"
                    href={`/medicine/${medicine._id}`}
                    price={medicine.price}
                    priceUnit=""
                    topAction={
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToWishlist({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' });
                            }}
                            className={`p-2 rounded-full transition-colors bg-white/80 backdrop-blur-sm ${isInWishlist(medicine._id) ? 'text-black' : 'text-gray-300 hover:text-black'
                                }`}
                        >
                            <Icon icon={isInWishlist(medicine._id) ? "solar:heart-bold" : "solar:heart-linear"} className="text-xl" />
                        </button>
                    }
                    footerAction={
                        <button
                            onClick={() => addToCart({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                            className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-bold shadow-lg shadow-black/10"
                        >
                            <Icon icon="solar:cart-plus-linear" className="text-lg" /> Add
                        </button>
                    }
                />
            ))}
        </div>
    );

    // If it's used as a section (e.g. on Homepage), wrap it in Section
    if (title && subtitle) {
        return (
            <Section id="medicines">
                <ListingHeader title={title} subtitle={subtitle} viewAllLink={viewAllLink} />
                {listContent}
            </Section>
        );
    }

    return listContent;
}
