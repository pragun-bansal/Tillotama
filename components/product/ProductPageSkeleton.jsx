// File: components/product/ProductPageSkeleton.jsx
import Skeleton  from "@/components/product/Skeleton";

export function ProductPageSkeleton() {
    return (
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
            <div className="xl:w-2/5 lg:w-2/5 w-80 md:block hidden">
                <Skeleton className="w-full h-[100vh] md:h-[70vh] xl:h-[100vh] mb-[30px] rounded-xl" />
            </div>
            <div className="md:hidden">
                <Skeleton className="w-full h-[35vh] rounded-xl" />
            </div>
            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6 md:overflow-y-auto md:h-[70vh] xl:h-[100vh]">
                <div className="border-b border-gray-200 pb-6">
                    <Skeleton className="h-6 w-1/4 mb-2" />
                    <Skeleton className="h-8 w-1/2" />
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/6" />
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/6" />
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/6" />
                </div>
                <div className="mt-4">
                    <Skeleton className="h-8 w-full mb-4" />
                    <Skeleton className="h-8 w-full" />
                </div>
                <div className="mt-4">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="border-t border-b py-4 mt-7 border-gray-200">
                    <Skeleton className="h-4 w-1/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="border-b py-4 border-gray-200">
                    <Skeleton className="h-4 w-1/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="border-b py-4 border-gray-200">
                    <Skeleton className="h-4 w-1/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        </div>
    );
}