export interface Nurse {
    _id: string;
    name: string;
    phone: number;
    email: string;
    gender: string;
    location: string;
    work: string;
    degree: string;
    ratings: number;
    description: string;
    images: {
        public_id: string;
        url: string;
        _id: string;
    }[];
    numOfReviews: number;
    fees: number;
    reviews: {
        user: string;
        name: string;
        rating: number;
        comment: string;
        _id: string;
    }[];
}

export interface Medicine {
    _id: string;
    name: string;
    commonName?: string;
    company: string;
    type: string;
    price: number;
    quantity: number;
    image: {
        public_id: string;
        url: string;
    };
    category?: string; // Optional as it wasn't in the snippet but might be useful
    description?: string;
}
