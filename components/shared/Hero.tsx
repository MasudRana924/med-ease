"use client";

import { useEffect, useState } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const items = [
    {
        id: "doctor",
        title: "Expert Doctors",
        subtitle: "Top Specialists",
        image: "/images/hero/doctor.png",
        color: "bg-blue-50",
    },
    {
        id: "medicine",
        title: "Quality Medicines",
        subtitle: "100% Genuine",
        image: "/images/hero/medicine.png",
        color: "bg-green-50",
    },
    {
        id: "nurse",
        title: "Home Nursing",
        subtitle: "Compassionate Care",
        image: "/images/hero/nurse.png",
        color: "bg-pink-50",
    },
];

export default function Hero() {
    const [activeId, setActiveId] = useState(items[0].id);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveId((current) => {
                const currentIndex = items.findIndex((item) => item.id === current);
                const nextIndex = (currentIndex + 1) % items.length;
                return items[nextIndex].id;
            });
        }, 2500); // Slightly slower than 2s for better readability of the motion

        return () => clearInterval(interval);
    }, []);

    const activeItem = items.find((item) => item.id === activeId);

    return (
        <section className="w-full bg-white overflow-hidden py-10 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <LayoutGroup>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">

                        {/* Left Side: Content & List */}
                        <div className="flex flex-col justify-center space-y-8 order-2 lg:order-1">
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-4">
                                        #1 Healthcare Platform
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                                        Your Health, <br />
                                        <span className="text-blue-600">Our Priority</span>
                                    </h1>
                                    <p className="text-lg text-gray-500 max-w-lg pt-4 leading-relaxed">
                                        Experience the future of healthcare with our integrated platform.
                                        From expert consultations to genuine medicine delivery, we have got you covered.
                                    </p>
                                </motion.div>

                                <div className="flex gap-4 pt-4">
                                    <Link
                                        href="/doctors"
                                        className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition transform hover:scale-105"
                                    >
                                        Book Appointment
                                    </Link>
                                    <Link
                                        href="/medicine"
                                        className="px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition"
                                    >
                                        Order Medicine
                                    </Link>
                                </div>
                            </div>

                            {/* The List of Items (Left Side) */}
                            <div className="mt-8">
                                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                                    Our Core Services
                                </p>
                                <div className="flex gap-4 md:gap-8">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 p-2"
                                        >
                                            {/* If the item is NOT active, show it here */}
                                            {activeId !== item.id && (
                                                <motion.div
                                                    layoutId={`hero-image-${item.id}`}
                                                    className="relative w-full h-full"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 350,
                                                        damping: 25,
                                                    }}
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </motion.div>
                                            )}

                                            {/* Placeholder text/content when image leaves */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 opacity-50 z-0">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">{item.id}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Featured Display Area */}
                        <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center order-1 lg:order-2">
                            {/* Background Decor */}
                            <div className={`absolute inset-0 rounded-[3rem] ${activeItem?.color} transition-colors duration-500 -z-10 transform rotate-3 scale-95 opacity-60`}></div>
                            <div className={`absolute inset-0 rounded-[3rem] bg-gray-50 -z-20`}></div>

                            {/* The Active Item Display */}
                            <AnimatePresence mode="popLayout">
                                {/* We map again to find the active one and project it here */}
                                {items.map((item) => (
                                    item.id === activeId && (
                                        <motion.div
                                            key={item.id}
                                            layoutId={`hero-image-${item.id}`}
                                            className="relative w-64 h-64 md:w-96 md:h-96"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-contain drop-shadow-2xl"
                                                priority
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="absolute -bottom-16 left-0 right-0 text-center"
                                            >
                                                <h3 className="text-3xl font-bold text-gray-800">{item.title}</h3>
                                                <p className="text-gray-600">{item.subtitle}</p>
                                            </motion.div>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>

                    </div>
                </LayoutGroup>
            </div>
        </section>
    );
}
