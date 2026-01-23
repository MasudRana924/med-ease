import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NursesList from "@/components/NursesList";
import MedicineList from "@/components/MedicineList";
import { NurseService, MedicineService } from "@/lib/api/services";
import { Icon } from "@iconify/react";

export default async function Home() {
  const nursesData = NurseService.getFeatured();
  const medicinesData = MedicineService.getFeatured();

  const [nurses, medicines] = await Promise.all([nursesData, medicinesData]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Medicine List */}
        <MedicineList medicines={medicines} />

        {/* Nurses List - Reusing MedicineList-like structure or ensuring NursesList is styled similarly */}
        <NursesList nurses={nurses} />

        {/* Medicine Services at a Glance */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Medicine Services at a Glance</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Ensuring availability, timely delivery, and affordable services for our customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6 text-3xl text-blue-600">
                  <Icon icon="solar:medical-kit-linear" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Medicine Available</h3>
                <div className="text-4xl font-extrabold text-blue-600 mb-2">10k+</div>
                <p className="text-gray-500">Medicines and healthcare products</p>
              </div>

              <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 text-3xl text-green-600">
                  <Icon icon="solar:delivery-linear" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delivery Time</h3>
                <div className="text-4xl font-extrabold text-green-600 mb-2">24-48 hrs</div>
                <p className="text-gray-500">Fast and reliable delivery</p>
              </div>

              <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6 text-3xl text-purple-600">
                  <Icon icon="solar:dollar-minimalistic-linear" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Service Charge</h3>
                <div className="text-4xl font-extrabold text-purple-600 mb-2">Free</div>
                <p className="text-gray-500">No hidden charges on purchases</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Our Pharmacy */}
        <section className="py-20 bg-white dark:bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Our Pharmacy?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Delivering quality medicines at your convenience—trusted by thousands for affordability, reliability, and exceptional service.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { title: "Extensive Inventory", desc: "Access a wide variety of medications including rare drugs from trusted suppliers.", icon: "solar:box-linear", color: "text-blue-500 bg-blue-100" },
                    { title: "Fast Delivery", desc: "Get your medications delivered quickly and reliably right to your doorstep.", icon: "solar:rocket-linear", color: "text-rose-500 bg-rose-100" },
                    { title: "Affordable Pricing", desc: "Competitive pricing with discounts on bulk orders. No hidden fees.", icon: "solar:tag-linear", color: "text-green-500 bg-green-100" },
                    { title: "Certified Products", desc: "All medications undergo strict quality checks ensuring safety and efficacy.", icon: "solar:shield-check-linear", color: "text-amber-500 bg-amber-100" },
                    { title: "Smart Suggestions", desc: "AI-driven recommendations based on your prescription history.", icon: "solar:cpu-linear", color: "text-purple-500 bg-purple-100" },
                    { title: "Easy Refills", desc: "Seamless refill process for recurring prescriptions with reminders.", icon: "solar:restart-linear", color: "text-cyan-500 bg-cyan-100" },
                    { title: "Nationwide", desc: "Order from anywhere in the country with our extensive delivery network.", icon: "solar:map-point-linear", color: "text-indigo-500 bg-indigo-100" },
                    { title: "Live Tracking", desc: "Track your orders in real-time with our intuitive tracking system.", icon: "solar:map-search-linear", color: "text-teal-500 bg-teal-100" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${item.color} dark:bg-opacity-20`}>
                        <Icon icon={item.icon} className="text-2xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                {/* Replace with a relevant image or keep a placeholder */}
                <img
                  src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1979&auto=format&fit=crop"
                  alt="Pharmacy Services"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <div className="text-5xl font-bold mb-2">100%</div>
                    <div className="text-xl font-medium opacity-90">Genuine Medicines</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
