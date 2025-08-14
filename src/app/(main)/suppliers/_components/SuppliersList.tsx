import { useState, useEffect } from "react";
import { RefreshCw, } from "lucide-react";
import useGetSuppliers from "@/hooks/suppliers/useGetSuppliers";
import EmptySuppliersList from "./EmptySuppliersList";
import SupplierSkeletons from "./SupplierSkeletonCard";
import SuppliersListError from "./SuppliersListError";
import SupplierCardV2 from "./SupplierCardV2";



function LoadingMore() {
    return (
        <div

            className="col-span-full flex animate-slide-up justify-center py-8"
        >
            <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
                <RefreshCw className="w-5 h-5 text-indigo-600 animate-spin" />
                <span className="text-gray-700 font-medium">جاري تحميل المزيد...</span>
            </div>
        </div>
    );
}





export default function SuppliersList({
    initialSuppliers,
    viewMode = 'grid'
}: {
    initialSuppliers?: IPaginatedResponse<ISupplier>;
    viewMode?: 'grid' | 'list';
}) {
    const {
        data: suppliers,
        ref,
        isPending,
        isFetching,
        isError,
        refetch
    } = useGetSuppliers({ initialData: initialSuppliers });

    const allSuppliers = suppliers?.pages.flatMap(page => page.data) || [];
    const [animationKey, setAnimationKey] = useState(0);

    // Update animation key when view mode changes for smooth transitions
    useEffect(() => {
        setAnimationKey(prev => prev + 1);
    }, [viewMode]);

    // Handle error state
    if (isError) {
        return <SuppliersListError onRetry={refetch} />;
    }

    return (
        <div className="relative">
            {/* Results Count */}
            {allSuppliers && allSuppliers.length > 0 ? (
                <div
                    key={`suppliers-${animationKey}`}
                    className=" grid grid-cols-1 md:grid-cols-2  gap-6 p-4"
                >
                    {allSuppliers.map((supplier, i) => (
                        <div
                            key={`${supplier.userId}-${i}`}
                            ref={i === allSuppliers.length - 1 ? ref : null}

                            className="h-full animate-slide-up"
                        >
                            <SupplierCardV2
                                supplier={supplier}
                            />
                        </div>
                    ))}

                    {/* Loading More Indicator */}
                    {(isPending || isFetching) && (
                        <LoadingMore />
                    )}
                </div>
            ) : !isPending ? (
                <EmptySuppliersList />
            ) : null}

            {/* Initial Loading State */}
            {isPending && allSuppliers.length === 0 && (
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 "
                >
                    <SupplierSkeletons count={3} />
                </div>
            )}



        </div>
    );
}