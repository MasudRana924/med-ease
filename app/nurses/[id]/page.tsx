import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Rating from "@/components/ui/Rating";
import { NurseService } from "@/lib/nurses/actions";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface NurseDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function NurseDetailsPage({ params }: NurseDetailsPageProps) {
    const { id } = await params;
    const nurse = await NurseService.getById(id);

    if (!nurse) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1">
                {/* Back Button */}
                <div className="container mx-auto px-4 md:px-6 pt-8 pb-4">
                    <Link
                        href="/nurses"
                        className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors group"
                    >
                        <Icon icon="solar:arrow-left-linear" className="text-xl group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Nurses</span>
                    </Link>
                </div>

                <div className="container mx-auto px-4 md:px-6 pb-16">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                            {/* Image Section */}
                            <div className="space-y-6">
                                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-black/10 bg-gray-50">
                                    {nurse.images && nurse.images[0] ? (
                                        <img
                                            src={nurse.images[0].url}
                                            alt={nurse.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Icon icon="solar:user-speak-linear" className="text-8xl text-gray-300" />
                                        </div>
                                    )}
                                </div>

                                {/* Additional Images */}
                                {nurse.images && nurse.images.length > 1 && (
                                    <div className="grid grid-cols-4 gap-4">
                                        {nurse.images.slice(1, 5).map((image, index) => (
                                            <div
                                                key={image._id || index}
                                                className="aspect-square rounded-xl overflow-hidden border border-black/10 bg-gray-50"
                                            >
                                                <img
                                                    src={image.url}
                                                    alt={`${nurse.name} ${index + 2}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Details Section */}
                            <div className="space-y-8">
                                {/* Header */}
                                <div className="space-y-4">
                                    <div>
                                        <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">
                                            {nurse.name}
                                        </h1>
                                        <p className="text-lg text-gray-600 font-medium">
                                            {nurse.degree} • {nurse.work}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <Rating 
                                            rating={nurse.ratings || 0} 
                                            numOfReviews={nurse.numOfReviews}
                                            size="lg"
                                        />
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="py-6 border-y border-black/10">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-medium text-gray-600">Service Fee:</span>
                                        <span className="text-5xl font-bold text-black">${nurse.fees}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                {nurse.description && (
                                    <div className="space-y-3">
                                        <h2 className="text-2xl font-bold text-black">About</h2>
                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            {nurse.description}
                                        </p>
                                    </div>
                                )}

                                {/* Information Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-black/10">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <Icon icon="solar:phone-linear" className="text-2xl text-black" />
                                            <div>
                                                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Phone</p>
                                                <p className="text-black font-medium">{nurse.phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <Icon icon="solar:letter-linear" className="text-2xl text-black" />
                                            <div>
                                                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Email</p>
                                                <p className="text-black font-medium break-all">{nurse.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <Icon icon="solar:map-point-linear" className="text-2xl text-black" />
                                            <div>
                                                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Location</p>
                                                <p className="text-black font-medium">{nurse.location}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <Icon icon="solar:user-id-linear" className="text-2xl text-black" />
                                            <div>
                                                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Gender</p>
                                                <p className="text-black font-medium">{nurse.gender}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button
                                        variant="primary"
                                        icon="solar:calendar-linear"
                                        className="flex-1 py-4 text-lg"
                                    >
                                        Book Appointment
                                    </Button>
                                    <Button
                                        variant="outline"
                                        icon="solar:phone-calling-linear"
                                        className="flex-1 py-4 text-lg"
                                    >
                                        Contact Now
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        {nurse.reviews && nurse.reviews.length > 0 && (
                            <div className="mt-16 pt-16 border-t border-black/10">
                                <h2 className="text-3xl font-bold text-black mb-8">Reviews</h2>
                                <div className="space-y-6">
                                    {nurse.reviews.map((review) => (
                                        <div key={review._id} className="bg-white border border-black/5 rounded-2xl p-6 space-y-4">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-bold text-black mb-1">{review.name}</h3>
                                                    <Rating rating={review.rating} size="sm" showNumber={false} />
                                                </div>
                                                {nurse.createdAt && (
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(nurse.createdAt).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                            {review.comment && (
                                                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
