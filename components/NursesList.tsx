"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { Nurse } from "@/types";

interface NursesListProps {
    nurses: Nurse[];
}

export default function NursesList({ nurses }: NursesListProps) {
    if (!nurses || nurses.length === 0) return null;

    return (
        <section id="nurses" className="py-24 bg-gray-50/50 dark:bg-gray-900/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-end justify-between mb-12">
                    <div className="space-y-1">
                        <span className="text-rose-500 font-bold tracking-widest text-xs uppercase pl-1">Dedicated Care</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Our Nurses</h2>
                    </div>
                    <Link
                        href="/nurses"
                        className="hidden md:flex items-center gap-2 text-gray-900 dark:text-white font-semibold hover:text-rose-500 transition-colors group"
                    >
                        View All Team <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {nurses.map((nurse) => (
                        <div key={nurse._id} className="group bg-white dark:bg-gray-800 rounded-[2.5rem] p-3 shadow-xl shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500 border border-gray-100 dark:border-gray-700">
                            {/* Image Container */}
                            <div className="relative h-[320px] w-full overflow-hidden rounded-[2rem]">
                                {nurse.images && nurse.images[0] ? (
                                    <img
                                        src={nurse.images[0].url}
                                        alt={nurse.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                        <Icon icon="solar:user-speak-linear" className="text-6xl text-gray-300" />
                                    </div>
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                                {/* Top Badge */}
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                                    <Icon icon="solar:star-bold" className="text-yellow-400 text-sm" /> {nurse.ratings || "5.0"}
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold mb-1">{nurse.name}</h3>
                                    <p className="text-white/80 text-sm font-medium tracking-wide mb-4">{nurse.degree} • {nurse.work}</p>

                                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 border-t border-white/20 pt-4">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-white/60 mb-0.5">Fees</p>
                                            <p className="text-xl font-bold">${nurse.fees}</p>
                                        </div>
                                        <button className="h-10 w-10 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors">
                                            <Icon icon="solar:arrow-right-up-linear" className="text-xl" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link
                        href="/nurses"
                        className="inline-flex items-center gap-2 text-rose-500 font-semibold"
                    >
                        View All Team <Icon icon="solar:arrow-right-linear" />
                    </Link>
                </div>

            </div>
        </section>
    );
}
