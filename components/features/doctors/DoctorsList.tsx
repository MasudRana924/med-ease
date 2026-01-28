"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Doctor } from "@/types";
import GridSwitcher from "@/components/shared/GridSwitcher";
import { ListSkeleton } from "@/components/shared/Skeleton";
import ItemCard from "@/components/shared/ItemCard";
import ListingHeader from "@/components/shared/ListingHeader";
import { Section } from "@/components/ui";

interface DoctorsListProps {
    doctors: Doctor[];
    showView?: boolean;
    title?: string;
    subtitle?: string;
    viewAllLink?: string;
    loading?: boolean;
}

export default function DoctorsList({
    doctors,
    showView = true,
    title,
    subtitle,
    viewAllLink,
    loading = false
}: DoctorsListProps) {
    const [columns, setColumns] = useState(4);

    if (loading) {
        return (
            <div id="doctors" className="w-full">
                <ListingHeader
                    title={title || "Doctors"}
                    subtitle={subtitle || "Specialists"}
                >
                    {showView && <GridSwitcher currentColumns={columns} onChange={setColumns} />}
                </ListingHeader>
                <ListSkeleton key="loading" columns={columns} count={8} />
            </div>
        );
    }

    if (!doctors || doctors.length === 0) return null;

    const getGridColsClass = () => {
        switch (columns) {
            case 1: return "grid-cols-1";
            case 2: return "grid-cols-1 sm:grid-cols-2";
            case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
            case 4: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
            default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
        }
    };

    const listContent = (
        <div id="doctors-list" className="w-full">
            {(showView || title) && (
                <ListingHeader
                    title={title || `${doctors.length} Doctors Available`}
                    subtitle={subtitle || "Specialists"}
                    viewAllLink={viewAllLink}
                >
                    {showView && (
                        <div className="hidden sm:flex items-center gap-4">
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">GridView:</span>
                            <GridSwitcher currentColumns={columns} onChange={setColumns} />
                        </div>
                    )}
                </ListingHeader>
            )}

            <div className={`grid ${getGridColsClass()} gap-8 transition-all duration-500`}>
                {doctors.map((doctor) => (
                    <ItemCard
                        key={doctor._id}
                        id={doctor._id}
                        title={doctor.title ? `${doctor.title} ${doctor.name}` : doctor.name}
                        subtitle={doctor.work}
                        tag={doctor.expert || "Specialist"}
                        image={doctor.avatar?.url}
                        placeholderIcon="solar:user-speak-linear"
                        href={`/doctors/${doctor._id}`}
                        price={doctor.fees}
                        priceUnit="/ session"
                        rating={doctor.ratings || "5.0"}
                        horizontal={columns === 1}
                        description={`Experienced Specialist with ${doctor.experience} years of expertise. Dedicated to providing world-class medical consultation at ${doctor.work}.`}
                        footerAction={
                            <button className={`${columns === 1 ? 'px-8 py-3' : 'px-6 py-2'} rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-bold shadow-lg shadow-black/10`}>
                                <Icon icon="solar:calendar-linear" className="text-lg" /> Book Now
                            </button>
                        }
                    />
                ))}
            </div>
        </div>
    );

    if (!showView && title) {
        return (
            <Section className="border-t border-gray-100">
                {listContent}
            </Section>
        );
    }

    return listContent;
}
