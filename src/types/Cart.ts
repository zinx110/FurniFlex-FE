import { User } from "./User";

export type Cart = {
    CartId: number;
    ProductId: number;
    Quantity: number;
    UserId: number;
    User?: User;
    Product?: any;
    Order?: any;
};
