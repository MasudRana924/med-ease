"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Link from "next/link";
import Image from "next/image";

const slides = [
    {
        title: "Expert Doctors",
        subtitle: "World-Class Care",
        description: "Connect with top-tier medical professionals for personalized care and expert advice.",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Quality Medicines",
        subtitle: "Reliable Pharmacy",
        description: "Genuine medicines delivered to your doorstep with our reliable e-pharmacy service.",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop"
    },
    {
        title: "Dedicated Nurses",
        subtitle: "Compassionate Care",
        description: "Professional nursing care at home or hospital to ensure comfort and quick recovery.",
        image: "https://images.unsplash.com/photo-1584515933487-9d9005c3080c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Blood Bank",
        subtitle: "Lifesaving Network",
        description: "Urgent blood supply network connecting donors and patients in times of critical need.",
        image: "https://images.unsplash.com/photo-1615461066841-6116e61058f5?q=80&w=1883&auto=format&fit=crop"
    }
];

export default function Hero() {
    return (
        <section className="w-full relative group bg-black">
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
                        return '<span class="' + className + ' !w-2 !h-2 !bg-white/50 !opacity-100 aria-[current=true]:!bg-white"></span>';
                    },
                }}
                modules={[Autoplay, Pagination, EffectFade]}
                className="w-full h-[600px] md:h-[700px]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            {/* Background Image - Desaturated for B&W feel or kept as is? User said "black and white theme", usually implies UI. 
                                Converting images to grayscale might be too aggressive unless requested, but let's stick to UI being B&W so images pop or are subtle. 
                                Actually user said "project as black and white", let's make images grayscale for full effect? 
                                "black and white er" - implies the theme. I will add grayscale filter to images for safety to match the vibe perfectly.
                            */}
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover grayscale" // Added grayscale for strict B&W theme compliance
                                priority={index === 0}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60" />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center justify-center text-center">
                                <div className="container mx-auto px-4 md:px-6">
                                    <div className="max-w-4xl mx-auto space-y-8 opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                                        <div className={`inline-block px-4 py-1.5 border border-white text-white font-medium text-sm tracking-[0.2em] uppercase mb-4`}>
                                            {slide.subtitle}
                                        </div>
                                        <h1 className="text-5xl md:text-8xl font-bold text-white leading-none tracking-tight">
                                            {slide.title}
                                        </h1>
                                        <p className="text-lg md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                                            {slide.description}
                                        </p>
                                        <div className="pt-8 flex gap-6 justify-center">
                                            <Link
                                                href="#"
                                                className={`px-10 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors`}
                                            >
                                                Get Started
                                            </Link>
                                            <button className="px-10 py-4 border border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
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
