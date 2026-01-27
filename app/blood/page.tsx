"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Button from "@/components/Button";

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
        <div className="flex flex-col min-h-screen bg-white font-sans text-black">
            {/* Hero Section */}
            <section className="relative w-full h-[500px] flex items-center justify-center bg-black overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white space-y-8">
                    <div className="inline-flex items-center gap-2 border border-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        Live Blood Network
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-4">
                        <span className="block text-gray-400 text-2xl md:text-3xl font-medium mb-2 tracking-[0.2em] uppercase">Lifeline</span>
                        BLOOD BANK
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Connecting donors with patients in real-time. Secure, fast, and reliable lifesaving network.
                    </p>

                    {/* Quick Stats Strip */}
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-12 border-t border-white/20 pt-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold">1.2k+</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Donors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">50+</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Banks</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">24/7</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Support</div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="flex-1 container mx-auto px-4 md:px-6 -mt-16 relative z-20 pb-20">

                {/* Filters */}
                <div className="bg-white rounded-[2rem] p-8 mb-16 border border-black/5 shadow-xl shadow-black/5">
                    <div className="flex flex-col lg:flex-row gap-8 items-center">

                        {/* Blood Group Selection */}
                        <div className="w-full lg:w-auto flex-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">Select Blood Group</label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedGroup("")}
                                    className={`h-10 px-6 rounded-full text-sm font-bold transition-all duration-300 ${selectedGroup === ""
                                        ? "bg-black text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    All
                                </button>
                                {bloodGroups.map(bg => (
                                    <button
                                        key={bg}
                                        onClick={() => setSelectedGroup(selectedGroup === bg ? "" : bg)}
                                        className={`h-10 w-10 rounded-full text-sm font-bold transition-all duration-300 ${selectedGroup === bg
                                            ? "bg-black text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black"
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
                                <Icon icon="lucide:search" className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    placeholder="e.g. Dhanmondi, Dhaka"
                                    className="w-full pl-14 pr-6 py-3 rounded-full bg-gray-50 border border-transparent focus:border-black focus:bg-white focus:outline-none transition-all font-medium text-black placeholder:text-gray-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-black flex items-center gap-3">
                        <span className="w-2 h-8 bg-black rounded-full inline-block"></span>
                        Available Donors
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{filteredDonors.length} found</span>
                    </h2>
                </div>

                {/* Donors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDonors.map(donor => (
                        <div key={donor.id} className="group bg-white rounded-3xl p-6 border border-black/5 hover:border-black/20 transition-all duration-300">

                            <div className="flex items-start justify-between mb-6">
                                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-2xl border ${donor.type === "Bank"
                                    ? "bg-gray-50 border-gray-200 text-gray-700"
                                    : "bg-white border-black text-black"
                                    }`}>
                                    <Icon icon={donor.type === "Bank" ? "mdi:bank-outline" : "mdi:account-heart-outline"} />
                                </div>
                                <div className={`h-10 px-3 flex items-center justify-center rounded-xl font-bold text-sm bg-black text-white`}>
                                    {donor.group}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold text-xl text-black mb-1 leading-tight">{donor.name}</h3>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                    {donor.type}
                                </div>
                            </div>

                            <div className="space-y-3 mb-8 border-t border-dashed border-gray-200 pt-4">
                                <div className="flex items-start gap-3">
                                    <Icon icon="mynaui:location" className="text-xl text-gray-400" />
                                    <span className="text-sm text-gray-600 font-medium">{donor.location}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`h-2 w-2 rounded-full ${donor.availability === "High" ? "bg-black" :
                                        donor.availability === "Critical" ? "bg-black animate-pulse" : "bg-gray-400"
                                        }`}></div>
                                    <span className="text-sm font-bold text-black">
                                        {donor.availability} Availability
                                    </span>
                                </div>
                            </div>

                            <button className="w-full py-4 rounded-xl bg-white border border-black text-black font-bold text-sm tracking-wide hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2">
                                <Icon icon="fluent:call-24-filled" /> {donor.contact}
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {/* CTA Section */}
            <section className="py-24 bg-black text-white text-center">
                <div className="container mx-auto px-4 md:px-6">
                    <Icon icon="mdi:heart-pulse" className="text-6xl text-white mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Be a Hero. Save a Life.</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        Your contribution can make a world of difference. Join our community of donors today and help us create a healthier tomorrow.
                    </p>
                    <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all">
                        Register as a Donor
                    </button>
                </div>
            </section>
        </div>
    );
}
