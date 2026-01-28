"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";

export default function MedicineSearch({
    initialSearch = ""
}: {
    initialSearch?: string
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm) {
                params.set("name", searchTerm);
            } else {
                params.delete("name");
            }
            router.push(`?${params.toString()}`, { scroll: false });
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, router, searchParams]);

    return (
        <div className="relative w-full max-w-2xl mx-auto -mt-24 z-20">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 -m-4" />
            <div className="relative">
                <Icon icon="lucide:search" className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                    type="text"
                    placeholder="Search for medicines..."
                    className="w-full pl-14 pr-6 py-5 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-black transition-all bg-white shadow-xl text-black placeholder:text-gray-400 text-lg font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
}
