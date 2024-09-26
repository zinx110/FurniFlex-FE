import { Product } from "./Product";
import { User } from "./User";

export type Cart = {
    CartId: number;
    ProductId: number;
    Quantity: number;
    UserId: number;
    User?: User;
    Product?: Product;
    Order?: any;
};
