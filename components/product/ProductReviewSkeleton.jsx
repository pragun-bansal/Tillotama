// File: components/product/ProductReviewSkeleton.jsx
import React from "react";
import Skeleton  from "@/components/product/Skeleton";

const ProductReviewsSkeleton = () => {
    return (
        <div className="px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center mt-16 lg:mt-0">
            <div className="flex flex-col justify-start items-start w-full space-y-8">
                <div className="flex">
                    <Skeleton className="h-8 w-1/4 mb-4" />
                    <Skeleton className="h-8 w-1/4 ml-auto mb-4" />
                </div>
                <div className="overflow-y-auto lg:h-[30vh]">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="w-full flex justify-start items-start flex-col bg-gray-50 p-8 mb-8">
                            <Skeleton className="h-6 w-1/2 mb-2" />
                            <div className="flex flex-col md:flex-row justify-between w-full">
                                <Skeleton className="h-6 w-1/4 mb-2" />
                                <div className="cursor-pointer mt-2 md:mt-0 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton key={i} className="h-6 w-6 mr-2" />
                                    ))}
                                </div>
                            </div>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-2" />
                            <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                                <div className="flex flex-col justify-start items-start space-y-2">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-4 w-1/4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductReviewsSkeleton;