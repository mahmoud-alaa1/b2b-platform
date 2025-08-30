"use client";

import Image from "next/image";
import { Tag, MapPin, Mail, Phone } from "lucide-react";
import { ISupplierInfo } from "@/types/supplier";

export default function SupplierHero({ supplier }: { supplier: ISupplierInfo }) {
  return (
    <section className="relative py-10 sm:py-16">
      {/* Background accents */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-10 left-10 w-52 h-52 bg-purple-200 rounded-full blur-3xl opacity-40" />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-10 z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10 bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-md">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-indigo-100 shadow-md">
              <Image
                src={supplier.logoUrl || "/logo-placeholder.png"}
                alt={supplier.name || "شعار المورد"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 200px"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-right space-y-4 sm:space-y-6">
            {/* Company Name */}
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {supplier.name}
            </h4>

            {/* Description */}
            {supplier.description && (
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base bg-gray-50 p-3 sm:p-4 rounded-xl">
                {supplier.description}
              </p>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 text-gray-600">
              {supplier.email && (
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs sm:text-sm">{supplier.email}</span>
                </div>
              )}
              {supplier.phoneNumber && (
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                  <Phone className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs sm:text-sm">{supplier.phoneNumber}</span>
                </div>
              )}
            </div>

            {/* Categories */}
            {supplier.categories?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  التصنيفات المرتبطة
                </h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {supplier.categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-indigo-100"
                    >
                      <Tag className="w-3 h-3 mr-1.5" />
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Locations */}
            {supplier.locations?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  مواقع التوريد
                </h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {supplier.locations.map((location, idx) => (
                    <span
                      key={idx}
                      className="flex items-center bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-purple-100"
                    >
                      <MapPin className="w-3 h-3 ml-1" />
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
