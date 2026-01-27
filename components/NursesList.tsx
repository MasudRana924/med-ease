"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { Nurse } from "@/types";
import GridSwitcher from "./GridSwitcher";

interface NursesListProps {
    nurses: Nurse[];
    showView?: boolean;
}

export default function NursesList({ nurses, showView = true }: NursesListProps) {
    const [columns, setColumns] = useState(4);

    if (!nurses || nurses.length === 0) return null;

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
        <section id="nurses" className="py-24 bg-zinc-50">
            <div className="w-full lg:w-9/12 mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-2">
                        <span className="text-gray-500 font-bold tracking-[0.2em] text-xs uppercase pl-1">Dedicated Care</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">Our Nurses</h2>
                    </div>

                    {showView && (
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider hidden sm:block">View:</span>
                                <GridSwitcher currentColumns={columns} onChange={setColumns} />
                            </div>
                        </div>
                    )}
                </div>

                <div className={`grid ${getGridColsClass()} gap-8 transition-all duration-500`}>
                    {nurses.map((nurse) => (
                        <Link
                            key={nurse._id}
                            href={`/nurses/${nurse._id}`}
                            className={`group bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 transition-all duration-500 shadow-sm hover:shadow-xl cursor-pointer ${columns === 1 ? 'flex flex-col md:flex-row' : ''}`}
                        >
                            {/* Image Container */}
                            <div className={`relative overflow-hidden ${columns === 1 ? 'h-[320px] md:h-[400px] md:w-1/3 w-full' : 'h-[320px] w-full'}`}>
                                {nurse.images && nurse.images[0] ? (
                                    <Image
                                        src={nurse.images[0].url}
                                        alt={nurse.name}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <Icon icon="solar:user-speak-linear" className="text-6xl text-gray-300" />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 text-black">
                                    <Icon icon="solar:star-bold" className="text-black text-sm" /> {nurse.ratings || "5.0"}
                                </div>

                                {columns !== 1 && (
                                    <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-2xl font-bold mb-1">{nurse.name}</h3>
                                        <p className="text-gray-300 text-sm font-medium tracking-wide mb-4">{nurse.degree} • {nurse.work}</p>

                                        <div className="flex items-center justify-between border-t border-white/20 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Fees</p>
                                                <p className="text-xl font-bold">${nurse.fees}</p>
                                            </div>
                                            <div className="h-10 w-10 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                                <Icon icon="solar:arrow-right-up-linear" className="text-xl" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {columns === 1 && (
                                <div className="flex-1 p-8 flex flex-col justify-center">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-3xl font-bold text-black mb-1">{nurse.name}</h3>
                                            <p className="text-primary font-semibold tracking-wide">{nurse.degree} • {nurse.work}</p>
                                        </div>

                                        <p className="text-gray-500 max-w-xl">
                                            Experienced nursing professional dedicated to providing compassionate care and support to patients. With a background in {nurse.work}, bringing expertise and excellence to every patient interaction.
                                        </p>

                                        <div className="flex items-center gap-8 py-6 border-y border-gray-100">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Service Fee</p>
                                                <p className="text-3xl font-bold text-black">${nurse.fees}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Rating</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-bold text-black">{nurse.ratings || "5.0"}</span>
                                                    <div className="flex text-black">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Icon key={i} icon="solar:star-bold" className="text-lg" />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 pt-2">
                                            <div className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-3 shadow-lg shadow-black/10">
                                                Book Appointment <Icon icon="solar:calendar-linear" className="text-xl" />
                                            </div>
                                            <div className="h-14 w-14 border border-black/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all group/info">
                                                <Icon icon="solar:info-circle-linear" className="text-2xl group-hover/info:rotate-12 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Link>
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
