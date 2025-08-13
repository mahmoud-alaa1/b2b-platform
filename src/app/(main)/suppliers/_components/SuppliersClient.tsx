"use client";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Search,
    Filter,
    SortAsc,
    SortDesc,
    Grid3X3,
    List,
    Star,
    Calendar,
    Package,
    CheckCircle,
    XCircle,
    Clock,
    User,
    Mail,
    Award,
    TrendingUp,
    MapPin,
    Phone
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Types
interface ISubscribedSupplier {
    id: number;
    name: string;
    email: string;
    subscribePlan: string;
    subscriptionStart: string;
    subscriptionEnd: string;
    joinDate: string;
    ordersCompleted: number;
    planStatus: string;
}

interface ISuppliersFilters {
    search: string;
    planName: string;
    status: string;
    page: number | string;
    pageSize: number | string;
    sortColumn: string;
    sortOrder: 'Asc' | 'Desc';
}

// Mock data
const mockSuppliers: ISubscribedSupplier[] = [
    {
        id: 1,
        name: "مطعم الأصالة للمأكولات الشعبية",
        email: "asala@restaurant.com",
        subscribePlan: "Premium",
        subscriptionStart: "2024-01-15",
        subscriptionEnd: "2024-12-15",
        joinDate: "2023-06-20",
        ordersCompleted: 145,
        planStatus: "Active"
    },
    {
        id: 2,
        name: "فندق الرياض الدولي",
        email: "riyadh@hotel.com",
        subscribePlan: "Enterprise",
        subscriptionStart: "2024-02-01",
        subscriptionEnd: "2025-02-01",
        joinDate: "2023-03-10",
        ordersCompleted: 89,
        planStatus: "Active"
    },
    {
        id: 3,
        name: "مقهى القهوة الذهبية",
        email: "golden@cafe.com",
        subscribePlan: "Basic",
        subscriptionStart: "2024-01-01",
        subscriptionEnd: "2024-06-01",
        joinDate: "2023-12-15",
        ordersCompleted: 67,
        planStatus: "Expired"
    },
];

const planColors = {
    Basic: "bg-blue-100 text-blue-800 border-blue-200",
    Premium: "bg-purple-100 text-purple-800 border-purple-200",
    Enterprise: "bg-orange-100 text-orange-800 border-orange-200"
};

const statusColors = {
    Active: "bg-green-100 text-green-800 border-green-200",
    Expired: "bg-red-100 text-red-800 border-red-200",
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200"
};

// Supplier Card Component
function SupplierCard({ supplier, viewMode }: { supplier: ISubscribedSupplier; viewMode: 'grid' | 'list' }) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const daysUntilExpiry = Math.ceil(
        (new Date(supplier.subscriptionEnd).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    if (viewMode === 'list') {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-300">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                                    {supplier.name.charAt(0)}
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{supplier.name}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {supplier.email}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            انضم في {formatDate(supplier.joinDate)}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Package className="w-4 h-4" />
                                            {supplier.ordersCompleted} طلب مكتمل
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Badge className={planColors[supplier.subscribePlan as keyof typeof planColors]}>
                                    {supplier.subscribePlan}
                                </Badge>
                                <Badge className={statusColors[supplier.planStatus as keyof typeof statusColors]}>
                                    <div className="flex items-center gap-1">
                                        {supplier.planStatus === 'Active' ? (
                                            <CheckCircle className="w-3 h-3" />
                                        ) : supplier.planStatus === 'Expired' ? (
                                            <XCircle className="w-3 h-3" />
                                        ) : (
                                            <Clock className="w-3 h-3" />
                                        )}
                                        {supplier.planStatus === 'Active' ? 'نشط' : supplier.planStatus === 'Expired' ? 'منتهي' : 'قيد الانتظار'}
                                    </div>
                                </Badge>

                                <Button variant="outline" size="sm" className="hover:bg-indigo-50 hover:border-indigo-300">
                                    عرض التفاصيل
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-indigo-300 h-full">
                <CardContent className="p-6">
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                            {supplier.name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{supplier.name}</h3>
                        <p className="text-gray-600 text-sm">{supplier.email}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">الخطة:</span>
                            <Badge className={planColors[supplier.subscribePlan as keyof typeof planColors]}>
                                {supplier.subscribePlan}
                            </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">الحالة:</span>
                            <Badge className={statusColors[supplier.planStatus as keyof typeof statusColors]}>
                                <div className="flex items-center gap-1">
                                    {supplier.planStatus === 'Active' ? (
                                        <CheckCircle className="w-3 h-3" />
                                    ) : supplier.planStatus === 'Expired' ? (
                                        <XCircle className="w-3 h-3" />
                                    ) : (
                                        <Clock className="w-3 h-3" />
                                    )}
                                    {supplier.planStatus === 'Active' ? 'نشط' : supplier.planStatus === 'Expired' ? 'منتهي' : 'قيد الانتظار'}
                                </div>
                            </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">الطلبات المكتملة:</span>
                            <span className="font-semibold text-gray-900">{supplier.ordersCompleted}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">تاريخ الانتهاء:</span>
                            <span className="text-sm text-gray-700">{formatDate(supplier.subscriptionEnd)}</span>
                        </div>

                        {supplier.planStatus === 'Active' && daysUntilExpiry <= 30 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                                <span className="text-yellow-800 text-sm font-medium">
                                    ينتهي خلال {daysUntilExpiry} يوم
                                </span>
                            </div>
                        )}
                    </div>

                    <Button className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                        عرض التفاصيل
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}

// Search and Filters Component
function SearchFilters({
    filters,
    onFiltersChange,
    totalResults
}: {
    filters: ISuppliersFilters;
    onFiltersChange: (filters: ISuppliersFilters) => void;
    totalResults: number;
}) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="ابحث عن الموردين..."
                            value={filters.search}
                            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value, page: 1 })}
                            className="pr-10 h-12 rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Plan Filter */}
                <div className="w-full lg:w-48">
                    <Select
                        value={filters.planName}
                        onValueChange={(value) => onFiltersChange({ ...filters, planName: value, page: 1 })}
                    >
                        <SelectTrigger className="h-12 rounded-xl border-gray-300">
                            <SelectValue placeholder="نوع الخطة" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">جميع الخطط</SelectItem>
                            <SelectItem value="Basic">أساسية</SelectItem>
                            <SelectItem value="Premium">مميزة</SelectItem>
                            <SelectItem value="Enterprise">للشركات</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Status Filter */}
                <div className="w-full lg:w-48">
                    <Select
                        value={filters.status}
                        onValueChange={(value) => onFiltersChange({ ...filters, status: value, page: 1 })}
                    >
                        <SelectTrigger className="h-12 rounded-xl border-gray-300">
                            <SelectValue placeholder="الحالة" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">جميع الحالات</SelectItem>
                            <SelectItem value="Active">نشط</SelectItem>
                            <SelectItem value="Expired">منتهي</SelectItem>
                            <SelectItem value="Pending">قيد الانتظار</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Sort */}
                <div className="w-full lg:w-48">
                    <Select
                        value={`${filters.sortColumn}-${filters.sortOrder}`}
                        onValueChange={(value) => {
                            const [column, order] = value.split('-');
                            onFiltersChange({
                                ...filters,
                                sortColumn: column,
                                sortOrder: order as 'Asc' | 'Desc',
                                page: 1
                            });
                        }}
                    >
                        <SelectTrigger className="h-12 rounded-xl border-gray-300">
                            <SelectValue placeholder="ترتيب حسب" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name-Asc">الاسم (أ-ي)</SelectItem>
                            <SelectItem value="name-Desc">الاسم (ي-أ)</SelectItem>
                            <SelectItem value="joinDate-Desc">الأحدث</SelectItem>
                            <SelectItem value="joinDate-Asc">الأقدم</SelectItem>
                            <SelectItem value="ordersCompleted-Desc">الأكثر طلبات</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                <div className="text-gray-600">
                    تم العثور على <span className="font-semibold text-gray-900">{totalResults}</span> مورد
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">عرض:</span>
                    <Select
                        value={filters.pageSize.toString()}
                        onValueChange={(value) => onFiltersChange({ ...filters, pageSize: parseInt(value), page: 1 })}
                    >
                        <SelectTrigger className="w-20 h-8">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="12">12</SelectItem>
                            <SelectItem value="24">24</SelectItem>
                            <SelectItem value="48">48</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
