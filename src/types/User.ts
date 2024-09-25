import { Cart } from "./Cart";

export type User = null | {
    Email: string;
    FirstName: string;
    LastName: string;
    ProfilePictureUrl: string;
    UserId: number;
    Phone: string;
    Location: string;
    CartItems: Cart[];
    Orders: any[];
    Reviews: any[];
    AuthToken: string;
};
