"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#0B1120] text-gray-300 py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Icon icon="mdi:stethoscope" className="text-teal-400" />
                            Our Services
                        </h3>
                        <ul className="space-y-4">
                            {["Find Doctors", "Order Medicine", "Book Nurses", "Call Ambulance", "Health Packages", "Lab Tests"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-teal-400 transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Payment Options */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Icon icon="fluent:payment-24-regular" className="text-teal-400" />
                            Payment Options
                        </h3>
                        <div className="flex gap-4">
                            <div className="bg-white p-2 rounded w-12 h-8 flex items-center justify-center">
                                <Icon icon="logos:visa" width="32" />
                            </div>
                            <div className="bg-white p-2 rounded w-12 h-8 flex items-center justify-center">
                                <Icon icon="logos:mastercard" width="24" />
                            </div>
                            <div className="bg-white p-2 rounded w-12 h-8 flex items-center justify-center">
                                {/* Placeholder for other payment */}
                            </div>
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Icon icon="mdi:support" className="text-teal-400" />
                            24/7 Support
                        </h3>
                        <p className="text-sm leading-relaxed mb-6">
                            Emergency medical assistance available 24/7. Our dedicated team is always ready to help.
                        </p>
                        <div className="flex items-start gap-3">
                            <Icon icon="mdi:map-marker" className="text-teal-400 text-xl mt-1" />
                            <div>
                                <h4 className="text-white font-semibold">Main Center</h4>
                                <p className="text-sm text-gray-400">123 Medical Avenue</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Icon icon="mdi:phone-in-talk" className="text-teal-400" />
                            Contact Us
                        </h3>
                        <div className="space-y-4">
                            <Link href="tel:1-800-HealthBridge" className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                <Icon icon="mdi:phone" className="text-teal-400" />
                                <span className="text-sm">1-800-MedEase</span>
                            </Link>
                            <Link href="mailto:support@medease.com" className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                <Icon icon="mdi:email" className="text-teal-400" />
                                <span className="text-sm">support@medease.com</span>
                            </Link>
                        </div>

                        <div className="flex gap-4 mt-8">
                            {["mdi:facebook", "mdi:instagram", "mdi:linkedin"].map(icon => (
                                <Link key={icon} href="#" className="h-10 w-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all">
                                    <Icon icon={icon} className="text-xl" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© 2026 Med-Ease. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
