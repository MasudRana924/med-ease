import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NursesList from "@/components/NursesList";
import { NurseService } from "@/lib/api/services";

export default async function NursesPage() {
    const nurses = await NurseService.getAll();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <section className="bg-primary/5 py-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Dedicated Nurses</h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                        Professional nursing care services available at your convenience.
                    </p>
                </section>
                <NursesList nurses={nurses} />
            </main>
            <Footer />
        </div>
    );
}
