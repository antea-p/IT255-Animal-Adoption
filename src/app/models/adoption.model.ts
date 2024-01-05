export interface Adoption {
    id?: number; // Optional for new adoptions
    // userId: number;
    // animalId: number;
    name: string;
    surname: string;
    phone: string;
    street: string;
    city: string;
    zipcode: string;
    country: string;
    paymentOption: string;
    personalNote?: string; // Optional
    consent: boolean;
}