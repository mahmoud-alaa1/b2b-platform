import useGetSuppliers from "@/hooks/suppliers/useGetSuppliers";
import SupplierCard from "./SupplierCard";
import EmptySuppliersList from "./EmptySuppliersList";
import SupplierSkeletons from "./SupplierSkeletonCard";

export default function SuppliersList({ initialSuppliers }: {
    initialSuppliers?: IPaginatedResponse<ISupplier>;
}) {
    const { data: suppliers, ref, isPending, isFetching } = useGetSuppliers({ initialData: initialSuppliers });
    const allSuppliers = suppliers?.pages.flatMap(page => page.data) || [];


    console.log(`the client suppliers`, allSuppliers)
    return (
        <div>
            {allSuppliers && allSuppliers.length > 0 ? (
                <div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 "
                >
                    {allSuppliers.map((supplier, i) => (
                        <div
                            key={`${supplier.userId}-${i}`}
                            ref={i === allSuppliers.length - 1 ? ref : null}
                            className="transition-all duration-300 ease-in-out hover:scale-105 animate-fade-in"
                        >
                            <SupplierCard supplier={supplier} />
                        </div>
                    ))}
                    {(isPending || isFetching) && (
                        <SupplierSkeletons />
                    )}
                </div>
            ) : (
                <EmptySuppliersList />
            )}

        </div>
    )
}
