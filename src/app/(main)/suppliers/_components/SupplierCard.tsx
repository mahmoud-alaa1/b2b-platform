"use client";

import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Building2, UserCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

function formatDate(date: string) {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return formattedDate;
}

function SupplierCard({ supplier }: { supplier: ISupplier }) {
    return (
        <div className="relative h-full bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group ">
            <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" />

            <div className="p-6 h-full flex flex-col items-center">
                <div className="relative mb-4">
                    {/* Logo Placeholder */}
                    <div className="w-30 h-30 rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-100 to-indigo-200 flex items-center justify-center shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-300">
                        <Building2 className="w-10 h-10 text-indigo-400 opacity-70" />

                    </div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white">
                        <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Company Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-1 text-center group-hover:text-indigo-700 transition-colors">
                    {supplier.companyName}
                </h3>
                {/* Username */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <UserCircle className="w-4 h-4" />
                    <span>{supplier.userName}</span>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-3 justify-center">
                    {supplier.categoryNames.slice(0, 3).map((cat, i) => (
                        <span
                            key={i}
                            className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium border border-indigo-100"
                        >
                            {cat}
                        </span>
                    ))}
                    {supplier.categoryNames.length > 3 && (
                        <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs font-medium border border-gray-200">
                            +{supplier.categoryNames.length - 3}
                        </span>
                    )}
                </div>

                {/* Locations */}
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="truncate max-w-[180px]">
                        {supplier.locations.join("، ")}
                    </span>
                </div>

                {/* Contact Info */}
                <div dir="ltr" className="flex flex-col gap-1 w-full mt-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Mail className="w-4 h-4 text-indigo-500" />
                        <span className="truncate">{supplier.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Phone className="w-4 h-4 " />
                        <span>{supplier.phoneNumber}</span>
                    </div>
                </div>

                {/* Join Date */}
                <div className="text-xs text-gray-400 mb-4">
                    انضم منذ {formatDate(supplier.joinDate)}
                </div>
                <div className="mt-auto">
                    <Button variant="gradient-indigo" className="rounded-xl font-semibold shadow-lg">
                        <Link href={`/suppliers/${supplier.userId}`}>
                            عرض الملف الشخصي
                        </Link>
                    </Button>
                </div>
            </div>



        </div >
    );
}

export default SupplierCard;