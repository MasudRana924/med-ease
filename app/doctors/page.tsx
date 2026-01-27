import DoctorsList from "@/components/DoctorsList";
import { DoctorService } from "@/lib/doctors/actions";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function DoctorsPage() {
    const doctors = await DoctorService.getAll();

    return (
        <>
            <section className="bg-primary/5 py-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Expert Doctors</h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                    Professional medical care services from certified specialists.
                </p>
            </section>
            <DoctorsList doctors={doctors} />
        </>
    );
}
