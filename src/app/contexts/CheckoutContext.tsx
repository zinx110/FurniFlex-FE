// contexts/CheckoutContext.tsx
"use client";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
type Address = {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    contactPhone: string;
};
type OrderDetails = {
    subTotal: number;
};

type PaymentInfo = {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    paymentMethod: "Visa" | "Mastercard" | "Bkash";
};
interface CheckoutContextType {
    orderDetails: OrderDetails;
    address: Address;
    paymentInfo: PaymentInfo;
    setOrderDetails: Dispatch<SetStateAction<OrderDetails>>;
    setAddress: Dispatch<SetStateAction<Address>>;
    setPaymentInfo: Dispatch<SetStateAction<PaymentInfo>>;
}

const CheckoutContext = createContext<CheckoutContextType>(
    {} as CheckoutContextType
);

export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [orderDetails, setOrderDetails] = useState({ subTotal: 0 });
    const [address, setAddress] = useState({
        street: "",
        city: "",
        postalCode: "",
        country: "",
        contactPhone: "",
    });
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        paymentMethod: "Visa",
    });

    const value = {
        orderDetails,
        address,
        paymentInfo,
        setOrderDetails,
        setAddress,
        setPaymentInfo,
    };

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
};
