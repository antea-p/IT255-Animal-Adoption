export interface Adoption {
    id: number;
    animalId: number;
    name: string;
    surname: string;
    phone: string;
    street: string;
    city: string;
    zipcode: string;
    country: string;
    paymentOption: string;
    adoptionDateTime: string;
    personalNote?: string;
}
