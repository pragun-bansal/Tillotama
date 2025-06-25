export interface User {
    _id: string;
    name: string;
    lastName?: string;
    username?: string;
    email: string;
    pfp: string;
    admin: boolean;
    addressLine1?: string;
    addressLine2?: string;
    town?: string;
    city?: string;
    pinCode?: string;
    phoneNumber?: string;
    gender?: 'male' | 'female' | 'other';
}

export interface Product {
    _id: string;
    name: string;
    all_images: string[];
    category: string[];
    tagline: string;
    description: string;
    rating: number;
    price: number;
    stock: number;
    sizes: Array<{
        size: string;
        price: number;
    }>;
    colors: Array<{
        color: string;
        price: number;
    }>;
    reviews: string[];
    offers: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    name: string;
    slug: string;
}

export interface NavbarProps {
    show: boolean;
    setShow: (show: boolean) => void;
}