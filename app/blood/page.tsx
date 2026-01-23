"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icon } from "@iconify/react";
import { useState } from "react";

// Mock Data
const donors = [
    { id: 1, name: "City Blood Bank", location: "Dhanmondi, Dhaka", group: "A+", availability: "High", contact: "01711223344", type: "Bank" },
    { id: 2, name: "Red Crescent Society", location: "Moghbazar, Dhaka", group: "O-", availability: "Critical", contact: "01811223344", type: "Bank" },
    { id: 3, name: "Rahim Ahmed", location: "Uttara, Dhaka", group: "B+", availability: "Available", contact: "01911223344", type: "Donor" },
    { id: 4, name: "Quantum Lab", location: "Shantinagar, Dhaka", group: "AB+", availability: "Medium", contact: "01611223344", type: "Bank" },
    { id: 5, name: "Sarah Khan", location: "Banani, Dhaka", group: "O+", availability: "Available", contact: "01511223344", type: "Donor" },
    { id: 6, name: "Police Blood Bank", location: "Rajarbagh, Dhaka", group: "All", availability: "High", contact: "01311223344", type: "Bank" },
    { id: 7, name: "Karim Uddin", location: "Mirpur, Dhaka", group: "A-", availability: "Unavailable", contact: "01411223344", type: "Donor" },
    { id: 8, name: "Square Hospital", location: "Panthapath, Dhaka", group: "All", availability: "High", contact: "01700000000", type: "Bank" },
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function BloodPage() {
    const [selectedGroup, setSelectedGroup] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredDonors = donors.filter(donor => {
        const matchGroup = selectedGroup ? (donor.group === selectedGroup || donor.group === "All") : true;
        const matchSearch = donor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchGroup && matchSearch;
    });

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black font-sans">
            <Header />

            {/* Immersive Hero Section */}
            <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-red-700">
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-rose-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white space-y-8">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium animate-fadeIn">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Live Blood Network
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-4 drop-shadow-xl">
                        <span className="block text-red-200 text-4xl md:text-5xl font-bold mb-4 tracking-wide uppercase">Lifeline</span>
                        BLOOD BANK
                    </h1>

                    <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto font-light leading-relaxed">
                        Connecting donors with patients in real-time. Secure, fast, and reliable lifesaving network.
                    </p>

                    {/* Quick Stats Strip */}
                    <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <div className="text-center border-r border-white/10">
                            <div className="text-3xl font-bold">1.2k+</div>
                            <div className="text-xs text-red-200 uppercase tracking-wider">Donors</div>
                        </div>
                        <div className="text-center border-r border-white/10">
                            <div className="text-3xl font-bold">50+</div>
                            <div className="text-xs text-red-200 uppercase tracking-wider">Banks</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">24/7</div>
                            <div className="text-xs text-red-200 uppercase tracking-wider">Support</div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="flex-1 container mx-auto px-4 md:px-6 -mt-24 relative z-20 pb-20">

                {/* Glassmorphic Filters */}
                <div className="bg-white/90 backdrop-blur-xl dark:bg-gray-800/90 rounded-[2.5rem] shadow-2xl p-8 mb-16 border border-white/20 dark:border-gray-700">
                    <div className="flex flex-col lg:flex-row gap-8 items-center">

                        {/* Blood Group Selection */}
                        <div className="w-full lg:w-auto flex-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">Select Blood Group</label>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setSelectedGroup("")}
                                    className={`h-12 px-6 rounded-2xl text-sm font-bold transition-all duration-300 ${selectedGroup === ""
                                            ? "bg-gray-900 text-white shadow-lg scale-105"
                                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                        }`}
                                >
                                    All
                                </button>
                                {bloodGroups.map(bg => (
                                    <button
                                        key={bg}
                                        onClick={() => setSelectedGroup(selectedGroup === bg ? "" : bg)}
                                        className={`h-12 w-12 rounded-2xl text-sm font-bold transition-all duration-300 ${selectedGroup === bg
                                                ? "bg-red-600 text-white shadow-lg shadow-red-500/30 scale-110"
                                                : "bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-500"
                                            }`}
                                    >
                                        {bg}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="w-full lg:w-[400px]">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">Search Location</label>
                            <div className="relative group">
                                <Icon icon="lucide:search" className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-red-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="e.g. Dhanmondi, Dhaka"
                                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent focus:border-red-500/20 focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all font-medium text-gray-900 dark:text-white shadow-inner"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="w-2 h-8 bg-red-500 rounded-full inline-block"></span>
                        Available Donors
                        <span className="text-sm font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{filteredDonors.length} found</span>
                    </h2>
                </div>

                {/* Premium Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDonors.map(donor => (
                        <div key={donor.id} className="group bg-white dark:bg-gray-800 rounded-[2rem] p-6 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.15)] transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-red-100 relative overflow-hidden">
                            {/* Hover Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/5 to-transparent rounded-bl-[100%] transition-opacity opacity-0 group-hover:opacity-100"></div>

                            <div className="flex items-start justify-between mb-6 relative">
                                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${donor.type === "Bank"
                                        ? "bg-red-50 text-red-600"
                                        : "bg-blue-50 text-blue-600"
                                    }`}>
                                    <Icon icon={donor.type === "Bank" ? "mdi:bank-outline" : "mdi:account-heart-outline"} />
                                </div>
                                <div className={`h-10 w-10 flex items-center justify-center rounded-xl font-black text-sm border-2 ${donor.group === "All" ? "border-gray-200 text-gray-400" : "border-red-100 text-red-500 bg-red-50/50"
                                    }`}>
                                    {donor.group}
                                </div>
                            </div>

                            <div className="mb-6 relative">
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1 group-hover:text-red-600 transition-colors">{donor.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <span className={`w-2 h-2 rounded-full ${donor.type === "Bank" ? "bg-red-400" : "bg-blue-400"
                                        }`}></span>
                                    {donor.type}
                                </div>
                            </div>

                            <div className="space-y-3 mb-8 relative border-t border-dashed border-gray-100 dark:border-gray-700 pt-4">
                                <div className="flex items-start gap-3">
                                    <Icon icon="mynaui:location" className="text-xl text-gray-400 mt-0.5" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">{donor.location}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`h-2 w-2 rounded-full ${donor.availability === "High" ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" :
                                            donor.availability === "Critical" ? "bg-red-500 animate-pulse" : "bg-yellow-500"
                                        }`}></div>
                                    <span className={`text-sm font-bold ${donor.availability === "Critical" ? "text-red-500" :
                                            donor.availability === "High" ? "text-green-600" : "text-yellow-600"
                                        }`}>
                                        {donor.availability} Availability
                                    </span>
                                </div>
                            </div>

                            <button className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-sm tracking-wide hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 group-hover:translate-y-[-2px]">
                                <Icon icon="fluent:call-24-filled" /> {donor.contact}
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {/* CTA Section */}
            <section className="py-24 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/20 to-transparent"></div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <Icon icon="mdi:heart-pulse" className="text-6xl text-red-500 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Be a Hero. Save a Life.</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        Your contribution can make a world of difference. Join our community of donors today and help us create a healthier tomorrow.
                    </p>
                    <button className="px-10 py-5 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-500 transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:-translate-y-1">
                        Register as a Donor
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
