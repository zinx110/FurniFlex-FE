// components/LoadingSpinner.tsx
import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div
                className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#e7bd6e]"
                role="status"
            />
        </div>
    );
};

export default LoadingSpinner;
