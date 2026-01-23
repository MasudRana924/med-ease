"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

const slides = [
    {
        title: "Expert Doctors",
        subtitle: "World-Class Care",
        description: "Connect with top-tier medical professionals for personalized care and expert advice.",
        color: "from-blue-600 to-cyan-500",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Quality Medicines",
        subtitle: "Reliable Pharmacy",
        description: "Genuine medicines delivered to your doorstep with our reliable e-pharmacy service.",
        color: "from-emerald-500 to-teal-400",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop"
    },
    {
        title: "Dedicated Nurses",
        subtitle: "Compassionate Care",
        description: "Professional nursing care at home or hospital to ensure comfort and quick recovery.",
        color: "from-rose-500 to-pink-400",
        image: "https://images.unsplash.com/photo-1584515933487-9d9005c3080c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Blood Bank",
        subtitle: "Lifesaving Network",
        description: "Urgent blood supply network connecting donors and patients in times of critical need.",
        color: "from-red-600 to-orange-500",
        image: "https://images.unsplash.com/photo-1615461066841-6116e61058f5?q=80&w=1883&auto=format&fit=crop"
    }
];

export default function Hero() {
    return (
        <section className="w-full relative group">
            <Swiper
                spaceBetween={0}
                effect="fade"
                centeredSlides={true}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + ' !w-3 !h-3 !bg-white/50 !opacity-100 aria-[current=true]:!bg-white"></span>';
                    },
                }}
                modules={[Autoplay, Pagination, EffectFade]}
                className="w-full h-[600px] md:h-[700px]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            {/* Background Image */}
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center">
                                <div className="container mx-auto px-4 md:px-6">
                                    <div className="max-w-2xl space-y-6 opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                                        <div className={`inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-medium text-sm tracking-wide mb-2`}>
                                            {slide.subtitle}
                                        </div>
                                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                                            {slide.title}
                                        </h1>
                                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
                                            {slide.description}
                                        </p>
                                        <div className="pt-4 flex gap-4">
                                            <Link
                                                href="#"
                                                className={`px-8 py-4 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors shadow-xl shadow-black/10`}
                                            >
                                                Get Started
                                            </Link>
                                            <button className="px-8 py-4 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white font-semibold hover:bg-white/10 transition-colors">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Styles for Pagination */}
            <style jsx global>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.8s ease-out;
        }
      `}</style>
        </section>
    );
}
