import { User } from "./User";

export type Role = {
    RoleId: number;
    Name: string;
    Users?: User[];
};
