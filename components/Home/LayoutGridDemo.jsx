// "use client";
// import React from "react";
// import { LayoutGrid } from "./layoutGrid";
//
// export function LayoutGridDemo() {
//     return (
//         (<div className="h-fit md:h-screen py-20 w-full">
//             <LayoutGrid cards={cards} />
//         </div>)
//     );
// }
//
// const SkeletonOne = () => {
//     return (
//         (<div>
//             <p className="font-bold md:text-4xl text-xl text-white">
//                 Bags
//             </p>
//             <p className="font-normal text-base text-white"></p>
//             <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
//                 A serene and tranquil retreat, this house in the woods offers a peaceful
//                 escape from the hustle and bustle of city life.
//             </p>
//         </div>)
//     );
// };
//
// const SkeletonTwo = () => {
//     return (
//         (<div>
//             <p className="font-bold md:text-4xl text-xl text-white">
//                 Soaps
//             </p>
//             <p className="font-normal text-base text-white"></p>
//             <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
//                 Perched high above the world, this house offers breathtaking views and a
//                 unique living experience. It&apos;s a place where the sky meets home,
//                 and tranquility is a way of life.
//             </p>
//         </div>)
//     );
// };
// const SkeletonThree = () => {
//     return (
//         (<div>
//             <p className="font-bold md:text-4xl text-xl text-white">
//                 Clothing
//             </p>
//             <p className="font-normal text-base text-white"></p>
//             <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
//                 A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
//                 perfect place to relax, unwind, and enjoy life.
//             </p>
//         </div>)
//     );
// };
// const SkeletonFour = () => {
//     return (
//         (<div>
//             <p className="font-bold md:text-4xl text-xl text-white">
//                 Festive Treats
//             </p>
//             <p className="font-normal text-base text-white"></p>
//             <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
//                 A house by the river is a place of peace and tranquility. It&apos;s the
//                 perfect place to relax, unwind, and enjoy life.
//             </p>
//         </div>)
//     );
// };
// const SkeletonFive = () => {
//     return (
//         (<div>
//             <p className="font-bold md:text-4xl text-xl text-white">
//                 Home Decor
//             </p>
//             <p className="font-normal text-base text-white"></p>
//             <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
//                 A house by the river is a place of peace and tranquility. It&apos;s the
//                 perfect place to relax, unwind, and enjoy life.
//             </p>
//         </div>)
//     );
// };
// const SkeletonSix = () => {
//     return (
//         (<div>
//             <p className="font-bold md:text-4xl text-xl text-white">
//                 All Products
//             </p>
//             <p className="font-normal text-base text-white"></p>
//             <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
//                 A house by the river is a place of peace and tranquility. It&apos;s the
//                 perfect place to relax, unwind, and enjoy life.
//             </p>
//         </div>)
//     );
// };
//
// const cards = [
//     {
//         id: 1,
//         content: <SkeletonOne />,
//         className: "md:col-span-1",
//         thumbnail:
//             "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//         id: 2,
//         content: <SkeletonTwo />,
//         className: "md:col-span-1",
//         thumbnail:
//             "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//         id: 3,
//         content: <SkeletonThree />,
//         className: "col-span-1",
//         thumbnail:
//             "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//         id: 4,
//         content: <SkeletonFour/>,
//         className: "col-span-1",
//         thumbnail:
//             "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//         id: 5,
//         content: <SkeletonFive />,
//         className: "col-span-1",
//         thumbnail:
//             "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//         id: 6,
//         content: <SkeletonSix />,
//         className: "md:col-span-1",
//         thumbnail:
//             "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
// ];

"use client";
import React from "react";
import { LayoutGrid } from "./layoutGrid";
import { Categories } from "@/public/Categories";

export function LayoutGridDemo() {
    return (
        <div className="h-fit py-10 w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Our Collection
                </h2>
            </div>
            <LayoutGrid cards={cards} />
        </div>
    );
}

// Standard Skeleton Component for Categories
const CategorySkeleton = ({ title, description }) => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                {title}
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                {description}
            </p>
        </div>
    );
};

// Generate cards from Categories data
const categoryCards = Categories.map((category, index) => ({
    id: index + 1,
    content: (
        <CategorySkeleton
            title={category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            description={category.description}
        />
    ),
    title: category.name,
    description: category.description,
    className: index < 2 ? "md:col-span-1" : "col-span-1",
    thumbnail: category.imageUrl,
}));

// Add "All Products" card at the end
// const allProductsCard = {
//     id: Categories.length + 1,
//     content: (
//         <CategorySkeleton
//             title="All Products"
//             description="Explore our complete collection of handcrafted items, fashion pieces, and home essentials. Discover unique products across all categories in one convenient place, perfect for finding that special something for any occasion."
//         />
//     ),
//     className: "md:col-span-1",
//     thumbnail: "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// };

// Combine category cards with all products card
const cards = [...categoryCards]; //, allProductsCard];