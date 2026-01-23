import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icon } from "@iconify/react";

export default function DoctorsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center py-20 text-center bg-gray-50 dark:bg-black/20">
                <div className="bg-blue-100 p-8 rounded-full mb-6 dark:bg-blue-900/30">
                    <Icon icon="fontisto:doctor" className="text-6xl text-blue-500" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Doctors Portal</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-lg mb-8">
                    Access to our top-tier specialists is coming soon. We are onboarding the best medical professionals for you.
                </p>
                <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
                    Notify Me
                </button>
            </main>
            <Footer />
        </div>
    );
}
