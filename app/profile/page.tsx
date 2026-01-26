"use client";

import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/guards/AuthGuard";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Button from "@/components/Button";

export default function ProfilePage() {
    const { user, logout } = useAuth();

    return (
        <AuthGuard>
            <div className="flex flex-col min-h-screen bg-white">
                <Header />
                <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-black mb-2">My Profile</h1>
                            <p className="text-gray-600">Manage your account information</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                    {user?.avatar?.url ? (
                                        <Image
                                            src={user.avatar.url}
                                            alt={user?.name || "User"}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <Icon icon="solar:user-circle-bold" className="text-6xl text-gray-400" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-black mb-2">{user?.name}</h2>
                                    <p className="text-gray-600 mb-1">{user?.email}</p>
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full capitalize">
                                        {user?.role || "User"}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                                        Full Name
                                    </label>
                                    <p className="text-xl font-medium text-black">{user?.name}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                                        Email Address
                                    </label>
                                    <p className="text-xl font-medium text-black">{user?.email}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                                        Role
                                    </label>
                                    <p className="text-xl font-medium text-black capitalize">{user?.role || "User"}</p>
                                </div>

                                {user?.phone && (
                                    <div>
                                        <label className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                                            Phone Number
                                        </label>
                                        <p className="text-xl font-medium text-black">{user.phone}</p>
                                    </div>
                                )}

                                {user?.createdAt && (
                                    <div>
                                        <label className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                                            Member Since
                                        </label>
                                        <p className="text-xl font-medium text-black">
                                            {new Date(user.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                )}

                                <div className="pt-6 border-t border-gray-200">
                                    <Button
                                        variant="outline"
                                        onClick={logout}
                                        className="w-full md:w-auto"
                                    >
                                        <Icon icon="solar:logout-3-linear" className="mr-2" />
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </AuthGuard>
    );
}
