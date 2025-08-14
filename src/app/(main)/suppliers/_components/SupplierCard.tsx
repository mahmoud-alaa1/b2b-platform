"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
    Mail, 
    Phone, 
    MapPin, 
    Building2, 
    CheckCircle, 
    Star,
    Heart,
    MessageCircle,
    ExternalLink,
    TrendingUp,
    Clock,
    Users,
    Shield,
    ArrowRight,
    Zap
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

interface SupplierCardProps {
    supplier: ISupplier;
    viewMode?: 'grid' | 'list';
}

// Simplified metrics
const getSupplierMetrics = (supplier: ISupplier) => ({
    rating: 4.8,
    reviewCount: 124,
    responseTime: "خلال ساعة",
    completedOrders: 450,
    isOnline: true,
    hasActiveDeals: true,
    verified: true,
    trending: Math.random() > 0.7,
    featured: Math.random() > 0.8
});

function SupplierCard({ supplier, viewMode = 'grid' }: SupplierCardProps) {
    const [isFavorited, setIsFavorited] = useState(false);
    const metrics = getSupplierMetrics(supplier);

    const handleQuickContact = (method: 'email' | 'phone' | 'whatsapp') => {
        switch (method) {
            case 'email':
                window.open(`mailto:${supplier.email}`);
                break;
            case 'phone':
                window.open(`tel:${supplier.phoneNumber}`);
                break;
            case 'whatsapp':
                window.open(`https://wa.me/${supplier.phoneNumber.replace(/\D/g, '')}`);
                break;
        }
    };

    if (viewMode === 'list') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
            >
                <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            {/* Simple Avatar */}
                            <div className="relative flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                                    <Building2 className="w-8 h-8 text-blue-600" />
                                </div>
                                {metrics.isOnline && (
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                                )}
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        {/* Header */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-bold text-gray-900 text-lg truncate group-hover:text-blue-700 transition-colors">
                                                {supplier.companyName}
                                            </h3>
                                            
                                            <div className="flex items-center gap-1">
                                                {metrics.verified && (
                                                    <Badge className="bg-green-100 text-green-700 text-xs border-0">
                                                        <CheckCircle className="w-3 h-3 mr-1" />
                                                        موثق
                                                    </Badge>
                                                )}
                                                {metrics.trending && (
                                                    <Badge className="bg-red-100 text-red-700 text-xs border-0">
                                                        <TrendingUp className="w-3 h-3 mr-1" />
                                                        رائج
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {/* Rating & Stats */}
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="flex items-center gap-1">
                                                <div className="flex items-center">
                                                    {Array.from({ length: 5 }, (_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${
                                                                i < Math.floor(metrics.rating) 
                                                                    ? 'text-yellow-400 fill-current' 
                                                                    : 'text-gray-300'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {metrics.rating}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({metrics.reviewCount})
                                                </span>
                                            </div>
                                            
                                            <div className="text-sm text-gray-600">
                                                {metrics.completedOrders} طلب مكتمل
                                            </div>
                                        </div>

                                        {/* Categories */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {supplier.categoryNames.slice(0, 3).map((cat, i) => (
                                                <Badge
                                                    key={i}
                                                    variant="outline"
                                                    className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                                                >
                                                    {cat}
                                                </Badge>
                                            ))}
                                            {supplier.categoryNames.length > 3 && (
                                                <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
                                                    +{supplier.categoryNames.length - 3}
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Location & Response */}
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4 text-red-500" />
                                                <span>{supplier.locations[0]}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4 text-blue-500" />
                                                <span>يرد {metrics.responseTime}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 ml-4">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => setIsFavorited(!isFavorited)}
                                            className={`w-9 h-9 rounded-lg ${
                                                isFavorited 
                                                    ? 'text-red-500 bg-red-50' 
                                                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                            }`}
                                        >
                                            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                                        </Button>

                                        <div className="flex gap-1">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleQuickContact('phone')}
                                                className="h-9 px-3 border-gray-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                                            >
                                                <Phone className="w-4 h-4 mr-1" />
                                                اتصال
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleQuickContact('whatsapp')}
                                                className="h-9 px-3 border-gray-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                                            >
                                                <MessageCircle className="w-4 h-4 mr-1" />
                                                واتساب
                                            </Button>
                                        </div>

                                        <Link href={`/suppliers/${supplier.userId}`}>
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 h-9">
                                                عرض الملف
                                                <ArrowRight className="w-4 h-4 mr-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    // Grid View - Clean & Simple
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group h-full">
                <CardContent className="p-0">
                    {/* Header with minimal decoration */}
                    <div className="relative p-6 pb-4">
                        {/* Favorite Button */}
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsFavorited(!isFavorited)}
                            className={`absolute top-4 left-4 w-8 h-8 rounded-lg ${
                                isFavorited 
                                    ? 'text-red-500 bg-red-50' 
                                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                            }`}
                        >
                            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                        </Button>

                        {/* Status Badges */}
                        <div className="absolute top-4 right-4 flex gap-1">
                            {metrics.verified && (
                                <Badge className="bg-green-100 text-green-700 text-xs border-0">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    موثق
                                </Badge>
                            )}
                            {metrics.hasActiveDeals && (
                                <Badge className="bg-orange-100 text-orange-700 text-xs border-0">
                                    <Zap className="w-3 h-3 mr-1" />
                                    عروض
                                </Badge>
                            )}
                        </div>

                        {/* Company Logo */}
                        <div className="flex flex-col items-center mt-8">
                            <div className="relative mb-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                    <Building2 className="w-10 h-10 text-blue-600" />
                                </div>
                                {metrics.isOnline && (
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white">
                                        <div className="w-1 h-1 bg-white rounded-full mx-auto mt-1 animate-pulse" />
                                    </div>
                                )}
                            </div>

                            {/* Company Name */}
                            <h3 className="text-lg font-bold text-gray-900 text-center mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                                {supplier.companyName}
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < Math.floor(metrics.rating) 
                                                    ? 'text-yellow-400 fill-current' 
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                    {metrics.rating}
                                </span>
                                <span className="text-sm text-gray-500">
                                    ({metrics.reviewCount})
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-6 pb-6">
                        {/* Simple Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-lg font-bold text-gray-900">{metrics.completedOrders}</div>
                                <div className="text-xs text-gray-600">طلب مكتمل</div>
                            </div>
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                                <div className="text-lg font-bold text-blue-700">سريع</div>
                                <div className="text-xs text-blue-600">الاستجابة</div>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                            {supplier.categoryNames.slice(0, 3).map((cat, i) => (
                                <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                                >
                                    {cat}
                                </Badge>
                            ))}
                            {supplier.categoryNames.length > 3 && (
                                <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
                                    +{supplier.categoryNames.length - 3}
                                </Badge>
                            )}
                        </div>

                        {/* Location */}
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span>{supplier.locations[0]}</span>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            {/* Quick Contact */}
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleQuickContact('phone')}
                                    className="flex-1 h-9 border-gray-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                                >
                                    <Phone className="w-4 h-4 mr-1" />
                                    اتصال
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleQuickContact('whatsapp')}
                                    className="flex-1 h-9 border-gray-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                                >
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    واتساب
                                </Button>
                            </div>

                            {/* Main CTA */}
                            <Link href={`/suppliers/${supplier.userId}`} className="block">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 transition-all">
                                    <span className="flex items-center justify-center gap-2">
                                        عرض الملف الشخصي
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default SupplierCard;