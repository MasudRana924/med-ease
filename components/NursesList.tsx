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
        <section id="nurses" className="py-24 bg-zinc-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-end justify-between mb-12">
                    <div className="space-y-2">
                        <span className="text-gray-500 font-bold tracking-[0.2em] text-xs uppercase pl-1">Dedicated Care</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">Our Nurses</h2>
                    </div>
                    <Link
                        href="/nurses"
                        className="hidden md:flex items-center gap-2 text-black font-semibold hover:text-gray-600 transition-colors group"
                    >
                        View All Team <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {nurses.map((nurse) => (
                        <div key={nurse._id} className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 transition-all duration-500">
                            {/* Image Container */}
                            <div className="relative h-[320px] w-full overflow-hidden">
                                {nurse.images && nurse.images[0] ? (
                                    <img
                                        src={nurse.images[0].url}
                                        alt={nurse.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <Icon icon="solar:user-speak-linear" className="text-6xl text-gray-300" />
                                    </div>
                                )}

                                {/* Gradient Overlay -> changed to simple dark overlay for text readability if needed, or better yet, move text below image for cleaner look? 
                                   Plan: Keep overlay but make it black/transparent. */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                                {/* Top Badge */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 text-black">
                                    <Icon icon="solar:star-bold" className="text-black text-sm" /> {nurse.ratings || "5.0"}
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold mb-1">{nurse.name}</h3>
                                    <p className="text-gray-300 text-sm font-medium tracking-wide mb-4">{nurse.degree} • {nurse.work}</p>

                                    <div className="flex items-center justify-between border-t border-white/20 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Fees</p>
                                            <p className="text-xl font-bold">${nurse.fees}</p>
                                        </div>
                                        <button className="h-10 w-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
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
                        className="inline-flex items-center gap-2 text-black font-semibold border-b border-black pb-0.5"
                    >
                        View All Team <Icon icon="solar:arrow-right-linear" />
                    </Link>
                </div>

            </div>
        </section>
    );
}
