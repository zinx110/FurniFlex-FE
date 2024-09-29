import React from "react";

export default function About() {
    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    About FurniFlex
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    At FurniFlex, we believe that the right furniture can
                    transform your living space into a home. Whether you&apos;re
                    looking for a sleek, modern design or a timeless classic, we
                    have the perfect pieces to fit your style. We offer a wide
                    variety of furniture that you can easily browse, order, and
                    have delivered directly to your door.
                </p>

                <p className="mt-6 text-lg text-gray-600">
                    Our mission is to provide high-quality, stylish, and
                    affordable furniture to our customers. We source our
                    products from trusted manufacturers and ensure that every
                    piece meets the highest standards of craftsmanship. Whether
                    you&apos;re furnishing a new home or simply upgrading your
                    current space, FurniFlex has everything you need to create a
                    space you love.
                </p>

                <p className="mt-6 text-lg text-gray-600">
                    We take pride in our seamless shopping experience. From
                    browsing our collection to finalizing your purchase, our
                    user-friendly platform makes it easy for you to find exactly
                    what you&apos;re looking for. With our reliable delivery
                    service, we ensure your furniture arrives safely and on
                    time, every time.
                </p>

                <p className="mt-6 text-lg text-gray-600">
                    Thank you for choosing FurniFlex. We&apos;re committed to
                    helping you create a beautiful and comfortable home.
                </p>

                <div className="mt-8">
                    <a
                        href="/contact"
                        className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}
