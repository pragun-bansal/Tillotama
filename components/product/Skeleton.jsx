// File: components/product/Skeleton.jsx
import { cn } from "@/lib/utils";

export default function Skeleton({
                      className,
                      ...props
                  }) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-gray-200", className)}
            {...props}
        />
    );
}